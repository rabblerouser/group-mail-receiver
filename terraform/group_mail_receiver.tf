variable "group_mail_receiver_lambda_name" {
  default = "group-mail-receiver"
}

data "aws_s3_bucket_object" "group_mailer_zip" {
  bucket = "${var.rabble_rouser_artefact_bucket}"
  key    = "${var.rabble_rouser_artefact_lambda_directory}/${var.group_mail_receiver_lambda_name}.zip"
}

resource "aws_lambda_function" "group_mail_receiver" {
  s3_bucket     = "${data.aws_s3_bucket_object.group_mailer_zip.bucket}"
  s3_key        = "${data.aws_s3_bucket_object.group_mailer_zip.key}"
  function_name = "${var.group_mail_receiver_lambda_name}"
  handler       = "index.handler"
  timeout       = 10
  role          = "${aws_iam_role.group_mail_receiver_role.arn}"
  runtime       = "nodejs4.3"

  environment = {
    variables = {
      LISTENER_ENDPOINT = "blah"
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
