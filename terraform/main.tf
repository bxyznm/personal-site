terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend configuration
  # When using GitHub Actions, the backend is configured dynamically via backend.hcl
  # For local development, uncomment and configure:
  
  backend "s3" {
    bucket         = "060795926773-personal-site-tfstate-us-east-1"
    key            = "portfolio/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
  
  # Or run locally with: terraform init -backend-config=backend.hcl
  # (Create backend.hcl with your values - it's in .gitignore)
}

provider "aws" {
  region = var.aws_region
  

  default_tags {
    tags = local.common_tags
  }
}

# ACM certificate must be in us-east-1 for CloudFront
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.common_tags
  }
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}

data "aws_canonical_user_id" "current" {}
