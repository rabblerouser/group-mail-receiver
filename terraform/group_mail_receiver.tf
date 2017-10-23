variable "group_mail_receiver_lambda_name" {
  default = "group-mail-receiver"
}

data "aws_s3_bucket_object" "group_mailer_zip" {
  bucket = "rabblerouser-artefacts"
  key = "lambdas/event_forwarder.zip"
  # Defaults to latest version
}

resource "aws_lambda_function" "group_mail_receiver" {
  s3_bucket     = "${data.aws_s3_bucket_object.group_mailer_zip.bucket}"
  s3_key        = "${data.aws_s3_bucket_object.group_mailer_zip.key}"
  s3_object_version = "${data.aws_s3_bucket_object.group_mailer_zip.version_id}"
  function_name = "group_mail_receiver"
  handler       = "index.handler"
  timeout       = 10
  role          = "${aws_iam_role.group_mail_receiver_role.arn}"
  runtime       = "nodejs6.10"

  environment = {
    variables = {
      FORWARD_TO_ENDPOINT = "https://group-mailer.${var.domain}/mail"
    }
  }
}

resource "aws_iam_role_policy_attachment" "group_mail_receiver_policy" {
  role       = "${aws_iam_role.group_mail_receiver_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaKinesisExecutionRole"
}

resource "aws_iam_role" "group_mail_receiver_role" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow"
      }
    ]
}
EOF
}
