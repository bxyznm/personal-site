# ============================================================
# Contact Form: SES + Lambda + API Gateway HTTP API
# ============================================================

# --- SES Email Identity ---
# The email address must be verified before SES can send from it.
# After `terraform apply`, check your inbox for a verification email.
resource "aws_ses_email_identity" "contact" {
  email = var.contact_email
}

# --- Lambda IAM Role ---
resource "aws_iam_role" "contact_lambda" {
  name = "${var.project_name}-${var.environment}-contact-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "contact_lambda_logs" {
  role       = aws_iam_role.contact_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_lambda_ses" {
  name = "ses-send-email"
  role = aws_iam_role.contact_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "ses:SendEmail"
      Resource = aws_ses_email_identity.contact.arn
    }]
  })
}

# --- Lambda Package ---
data "archive_file" "contact_lambda" {
  type        = "zip"
  source_file = "${path.module}/lambda/contact.py"
  output_path = "${path.module}/lambda/contact.zip"
}

# --- Lambda Function ---
resource "aws_lambda_function" "contact" {
  function_name    = "${var.project_name}-${var.environment}-contact"
  role             = aws_iam_role.contact_lambda.arn
  handler          = "contact.handler"
  runtime          = "python3.12"
  filename         = data.archive_file.contact_lambda.output_path
  source_code_hash = data.archive_file.contact_lambda.output_base64sha256

  environment {
    variables = {
      SENDER_EMAIL    = var.contact_email
      RECIPIENT_EMAIL = var.contact_email
      ALLOWED_ORIGIN  = "*"
    }
  }

  tags = local.common_tags
}

# --- API Gateway HTTP API ---
resource "aws_apigatewayv2_api" "contact" {
  name          = "${var.project_name}-${var.environment}-contact"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
    max_age       = 300
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_post" {
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "contact" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  tags = local.common_tags
}

resource "aws_lambda_permission" "contact_apigateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*"
}
