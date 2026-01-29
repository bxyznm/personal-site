# Troubleshooting Guide

Common issues and their solutions when deploying and running the portfolio website.

## Table of Contents

- [Deployment Issues](#deployment-issues)
- [Infrastructure Issues](#infrastructure-issues)
- [DNS and SSL Issues](#dns-and-ssl-issues)
- [Build Issues](#build-issues)
- [Performance Issues](#performance-issues)

## Deployment Issues

### GitHub Actions Deployment Fails

**Symptom**: Deployment workflow fails in GitHub Actions

**Common Causes**:

1. **Missing or incorrect secrets**
   ```
   Error: Required secret AWS_ACCESS_KEY_ID not found
   ```

   **Solution**:
   - Verify all secrets are configured in GitHub
   - Check secret names match exactly (case-sensitive)
   - Verify values don't have extra spaces

2. **AWS credentials expired or invalid**
   ```
   Error: The security token included in the request is invalid
   ```

   **Solution**:
   ```bash
   # Regenerate CI/CD credentials
   cd terraform
   terraform apply -target=aws_iam_access_key.cicd
   terraform output -raw cicd_access_key_id
   terraform output -raw cicd_secret_access_key
   # Update GitHub secrets
   ```

3. **S3 bucket permissions**
   ```
   Error: Access Denied when uploading to S3
   ```

   **Solution**:
   ```bash
   # Verify bucket policy exists
   terraform apply -target=aws_s3_bucket_policy.website
   ```

### CloudFront Invalidation Fails

**Symptom**: Deployment succeeds but changes don't appear

**Solution**:
```bash
# Manual invalidation
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"

# Check invalidation status
aws cloudfront get-invalidation \
  --distribution-id YOUR_DIST_ID \
  --id INVALIDATION_ID
```

**Prevention**:
- Ensure `AWS_CLOUDFRONT_DISTRIBUTION_ID` secret is correct
- Check IAM user has `cloudfront:CreateInvalidation` permission

## Infrastructure Issues

### Terraform Apply Fails

#### Issue: Resource Already Exists

**Symptom**:
```
Error: EntityAlreadyExists: User with name my-portfolio-cicd already exists
Error: Role with name my-portfolio-github-actions already exists
```

**Solution**:
```bash
# Import existing resources into Terraform state
terraform import aws_iam_user.cicd my-portfolio-cicd
terraform import aws_iam_role.github_actions my-portfolio-github-actions

# Then apply
terraform apply
```

#### Issue: CloudFront Function In Use

**Symptom**:
```
Error: FunctionInUse: Cannot delete function, it is in use by 1 distributions
```

**Solution**:
```bash
# Remove from state (Terraform will create new one)
terraform state rm aws_cloudfront_function.url_rewrite
terraform apply
```

#### Issue: Certificate Validation Timeout

**Symptom**:
```
Error: waiting for ACM Certificate validation: timeout
```

**Solution**:
1. Check DNS validation records are created:
   ```bash
   terraform output dns_configuration
   ```

2. Verify DNS records in your provider:
   ```bash
   dig _validation-hash.yourdomain.com CNAME
   ```

3. If records are missing, add them manually from ACM console or Terraform output

4. Wait 5-10 minutes and retry:
   ```bash
   terraform apply
   ```

### Terraform State Issues

#### Issue: State Lock Error

**Symptom**:
```
Error: Error acquiring the state lock
```

**Solution**:
```bash
# Check DynamoDB for locks
aws dynamodb scan \
  --table-name terraform-locks \
  --region us-east-1

# Force unlock (only if you're sure no one else is running Terraform)
terraform force-unlock LOCK_ID
```

#### Issue: State Out of Sync

**Symptom**: Terraform wants to recreate resources that already exist

**Solution**:
```bash
# Refresh state
terraform refresh

# Or import resources
terraform import RESOURCE_TYPE.NAME RESOURCE_ID
```

## DNS and SSL Issues

### Domain Not Resolving

**Symptom**: `nslookup yourdomain.com` returns no results

**Diagnosis**:
```bash
# Check DNS propagation
dig yourdomain.com
dig www.yourdomain.com

# Check nameservers
dig yourdomain.com NS
```

**Solutions**:

1. **Using Route53**: Verify records created:
   ```bash
   aws route53 list-resource-record-sets \
     --hosted-zone-id YOUR_ZONE_ID
   ```

2. **External DNS**:
   - Verify CNAME records point to CloudFront domain
   - Check TTL hasn't expired (wait for TTL duration)
   - Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)

3. **Nameserver issues**:
   - Verify your domain registrar points to correct nameservers
   - If using Route53, check NS records match hosted zone

### SSL Certificate Issues

#### Issue: Certificate Stuck in "Pending Validation"

**Solution**:
1. Get validation records from ACM:
   ```bash
   aws acm describe-certificate \
     --certificate-arn YOUR_CERT_ARN \
     --region us-east-1
   ```

2. Add CNAME validation records to DNS

3. Wait for validation (up to 30 minutes):
   ```bash
   aws acm wait certificate-validated \
     --certificate-arn YOUR_CERT_ARN \
     --region us-east-1
   ```

#### Issue: Browser Shows "Not Secure" Warning

**Diagnosis**:
- Check certificate status in ACM (should be "Issued")
- Verify CloudFront distribution has certificate attached
- Check domain matches certificate CN/SAN

**Solution**:
```bash
# Verify CloudFront certificate
aws cloudfront get-distribution \
  --id YOUR_DIST_ID \
  --query 'Distribution.DistributionConfig.ViewerCertificate'
```

### DNS Propagation Delays

**Symptom**: DNS changes take longer than expected

**Normal Timelines**:
- Route53 changes: 60 seconds
- External DNS providers: 5 minutes - 48 hours (depends on TTL)

**Speed it up**:
1. Set low TTL before making changes (e.g., 60 seconds)
2. Wait for old TTL to expire
3. Make changes
4. After changes propagate, increase TTL to normal (e.g., 3600)

## Build Issues

### Next.js Build Fails

#### Issue: Out of Memory

**Symptom**:
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solution**:
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

Or update `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 next build"
  }
}
```

#### Issue: MDX Parsing Error

**Symptom**:
```
Error: Could not parse MDX
```

**Solution**:
- Check MDX syntax in blog posts
- Ensure frontmatter is valid YAML
- Escape special characters in content

#### Issue: Image Optimization Errors

**Symptom**:
```
Error: Image Optimization using Next.js' default loader is not compatible with `output: 'export'`
```

**This is expected** - image optimization is disabled for static exports.

If you see this, verify `next.config.js` has:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true  // Required for static export
  }
}
```

### ESLint Errors in CI

**Symptom**: Linting passes locally but fails in CI

**Causes**:
- Different Node versions
- Missing dependencies in CI
- Git line ending differences

**Solution**:
```bash
# Ensure .gitattributes exists
echo "* text=auto eol=lf" > .gitattributes

# Install exact versions
npm ci  # Instead of npm install

# Test locally with CI Node version
nvm use 20  # Or your CI version
npm run lint
```

## Performance Issues

### Slow Page Loads

**Diagnosis**:
```bash
# Test CloudFront directly
curl -I https://YOUR_CLOUDFRONT_DOMAIN.cloudfront.net

# Check cache hit rate
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name CacheHitRate \
  --dimensions Name=DistributionId,Value=YOUR_DIST_ID \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Average
```

**Solutions**:

1. **Low cache hit rate**:
   - Check CloudFront cache behaviors
   - Verify cache-control headers
   - Reduce cache invalidations

2. **Large bundle sizes**:
   ```bash
   # Analyze bundle
   npm run build
   # Check .next/analyze/ output
   ```

3. **Slow origin response**:
   - Verify S3 region is close to CloudFront edge
   - Check S3 bucket performance

### CloudFront Distribution Taking Long to Deploy

**Expected**: 15-20 minutes for distribution changes

**Normal for these operations**:
- Creating new distribution
- Changing SSL certificate
- Modifying cache behaviors
- Updating custom error responses

**Abnormal**: If stuck >30 minutes, check AWS Service Health Dashboard

## Common Error Messages

### "Access Denied" from S3

**Cause**: Bucket policy doesn't allow CloudFront access

**Solution**:
```bash
terraform apply -target=aws_s3_bucket_policy.website
```

### "NoSuchBucket" Error

**Cause**: S3 bucket name mismatch or deleted

**Solution**:
```bash
# Verify bucket exists
aws s3 ls | grep portfolio

# Check GitHub secret matches
terraform output s3_bucket_name
```

### "DistributionNotDisabled" when Destroying

**Cause**: CloudFront distribution must be disabled before deletion

**Solution**:
```bash
# Disable distribution
aws cloudfront update-distribution \
  --id YOUR_DIST_ID \
  --if-match ETAG \
  --distribution-config file://config.json  # With Enabled: false

# Wait for deployment
aws cloudfront wait distribution-deployed --id YOUR_DIST_ID

# Then destroy
terraform destroy
```

## Debug Mode

Enable verbose logging:

```bash
# Terraform
export TF_LOG=DEBUG
terraform apply

# AWS CLI
aws s3 ls --debug

# Next.js
npm run build -- --debug
```

## Getting Help

If your issue isn't listed here:

1. **Check GitHub Actions logs**: Actions tab → Failed workflow → Click job → Expand steps
2. **Check CloudWatch logs**: For Lambda@Edge or application logs
3. **AWS Support**: For infrastructure issues
4. **Next.js GitHub**: For framework issues
5. **Create an issue**: In your repository with logs and error messages

## Useful Commands

```bash
# Test DNS
dig +short yourdomain.com
nslookup yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com
openssl s_client -connect yourdomain.com:443

# Test CloudFront
curl -I -H "Cache-Control: no-cache" https://yourdomain.com

# Check AWS resource status
aws cloudfront get-distribution --id DIST_ID
aws s3 ls s3://bucket-name
aws acm describe-certificate --certificate-arn ARN --region us-east-1

# Terraform state inspection
terraform state list
terraform state show aws_cloudfront_distribution.website
terraform refresh
```

## Prevention Best Practices

1. **Always test locally before deploying**
   ```bash
   npm run build
   npm run lint
   ```

2. **Use Terraform plan before apply**
   ```bash
   terraform plan -out=tfplan
   # Review carefully
   terraform apply tfplan
   ```

3. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

4. **Monitor deployments**
   - Watch GitHub Actions
   - Check CloudFront metrics
   - Set up CloudWatch alarms

5. **Backup Terraform state**
   - S3 versioning enabled (automatic)
   - Keep local backups of `.tfvars`

6. **Document changes**
   - Use conventional commits
   - Update version properly
   - Document breaking changes

