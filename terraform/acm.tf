# ACM Certificate (must be in us-east-1 for CloudFront)
resource "aws_acm_certificate" "website" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    Name = "${var.project_name}-certificate"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# DNS validation records (if using Route53)
resource "aws_route53_record" "certificate_validation" {
  for_each = var.create_dns_records ? {
    for dvo in aws_acm_certificate.website.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.route53_zone_id
}

# Certificate validation (with Route53)
resource "aws_acm_certificate_validation" "website_route53" {
  count    = var.create_dns_records ? 1 : 0
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation : record.fqdn]

  timeouts {
    create = "45m"
  }
}

# Certificate validation (manual DNS - no Route53)
resource "aws_acm_certificate_validation" "website_manual" {
  count    = var.create_dns_records ? 0 : 1
  provider = aws.us_east_1

  certificate_arn = aws_acm_certificate.website.arn

  # For manual validation, don't specify validation_record_fqdns
  # Add DNS records manually from the certificate's domain_validation_options

  timeouts {
    create = "60m" # Longer timeout for manual validation
  }

  lifecycle {
    ignore_changes = [validation_record_fqdns]
  }
}
