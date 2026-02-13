output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.website.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_distribution_arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.website.arn
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.website.arn
}

output "acm_certificate_status" {
  description = "ACM certificate status"
  value       = aws_acm_certificate.website.status
}

# CI/CD credentials (IAM User method)
output "cicd_access_key_id" {
  description = "Access key ID for CI/CD user (add to GitHub secrets as AWS_ACCESS_KEY_ID)"
  value       = aws_iam_access_key.cicd.id
  sensitive   = true
}

output "cicd_secret_access_key" {
  description = "Secret access key for CI/CD user (add to GitHub secrets as AWS_SECRET_ACCESS_KEY)"
  value       = aws_iam_access_key.cicd.secret
  sensitive   = true
}

# CI/CD Role ARN (OIDC method - recommended)
output "github_actions_role_arn" {
  description = "IAM Role ARN for GitHub Actions OIDC authentication"
  value       = aws_iam_role.github_actions.arn
}

# GitHub Secrets Summary
output "github_secrets_summary" {
  description = "Summary of values to add to GitHub repository secrets"
  value       = <<-EOF

    ============================================
    Add these secrets to your GitHub repository:
    ============================================

    AWS_ACCESS_KEY_ID: (run 'terraform output -raw cicd_access_key_id')
    AWS_SECRET_ACCESS_KEY: (run 'terraform output -raw cicd_secret_access_key')
    AWS_S3_BUCKET: ${aws_s3_bucket.website.id}
    AWS_CLOUDFRONT_DISTRIBUTION_ID: ${aws_cloudfront_distribution.website.id}
    CONTACT_API_URL: ${aws_apigatewayv2_stage.contact.invoke_url}/contact

    Add these variables to your GitHub repository:
    ============================================

    AWS_REGION: ${var.aws_region}
    DOMAIN_NAME: ${var.domain_name}

  EOF
}

# Contact Form API
output "contact_api_url" {
  description = "Contact form API endpoint URL — set this as CONTACT_API_URL in GitHub secrets"
  value       = "${aws_apigatewayv2_stage.contact.invoke_url}/contact"
}

# DNS Configuration (if not using Route53)
output "dns_configuration" {
  description = "DNS records to configure if not using Route53"
  value       = <<-EOF

    ============================================
    DNS Configuration (if not using Route53):
    ============================================

    Create these DNS records with your DNS provider:

    Type: CNAME
    Name: ${var.domain_name}
    Value: ${aws_cloudfront_distribution.website.domain_name}

    Type: CNAME
    Name: www.${var.domain_name}
    Value: ${aws_cloudfront_distribution.website.domain_name}

    For SSL certificate validation, add these records:
    ${join("\n", [for dvo in aws_acm_certificate.website.domain_validation_options : "Type: ${dvo.resource_record_type}, Name: ${dvo.resource_record_name}, Value: ${dvo.resource_record_value}"])}

  EOF
}
