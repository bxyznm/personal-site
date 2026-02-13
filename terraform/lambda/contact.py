import json
import os
import html
import boto3
from botocore.exceptions import ClientError


def handler(event, context):
    allowed_origin = os.environ.get("ALLOWED_ORIGIN", "*")
    cors_headers = {
        "Access-Control-Allow-Origin": allowed_origin,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Content-Type": "application/json",
    }

    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except (json.JSONDecodeError, TypeError):
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Invalid request body"}),
        }

    name = str(body.get("name", "")).strip()
    email = str(body.get("email", "")).strip()
    subject = str(body.get("subject", "")).strip()
    message = str(body.get("message", "")).strip()

    if not all([name, email, subject, message]):
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "All fields are required"}),
        }

    if len(message) > 5000:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Message is too long"}),
        }

    sender = os.environ["SENDER_EMAIL"]
    recipient = os.environ["RECIPIENT_EMAIL"]

    # Escape user input for HTML email body
    name_esc = html.escape(name)
    email_esc = html.escape(email)
    subject_esc = html.escape(subject)
    message_esc = html.escape(message).replace("\n", "<br>")

    text_body = (
        f"New contact form submission\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}"
    )

    html_body = f"""<html><body>
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {name_esc}</p>
<p><strong>Email:</strong> {email_esc}</p>
<p><strong>Subject:</strong> {subject_esc}</p>
<hr>
<p>{message_esc}</p>
</body></html>"""

    try:
        ses = boto3.client("ses")
        ses.send_email(
            Source=sender,
            Destination={"ToAddresses": [recipient]},
            Message={
                "Subject": {"Data": f"[Portfolio Contact] {subject}"},
                "Body": {
                    "Text": {"Data": text_body},
                    "Html": {"Data": html_body},
                },
            },
            ReplyToAddresses=[email],
        )
    except ClientError as e:
        code = e.response["Error"]["Code"]
        print(f"SES error ({code}): {e}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Failed to send message. Please try again later."}),
        }
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Internal server error"}),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"message": "Your message has been sent!"}),
    }
