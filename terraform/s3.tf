resource "aws_s3_bucket" "email" {
  bucket = "${var.group_mail_s3_bucket_name}"
  acl    = "private"

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "GiveSESPermissionToWriteEmail",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "ses.amazonaws.com"
                ]
            },
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::${var.group_mail_s3_bucket_name}/*",
            "Condition": {
                "StringEquals": {
                    "aws:Referer": "${var.aws_account_id}"
                }
            }
        }
    ]
}
EOF
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = "${aws_s3_bucket.email.id}"

  lambda_function {
    lambda_function_arn = "${aws_lambda_function.group_mail_receiver.arn}"
    events              = ["s3:ObjectCreated:*"]
  }
}

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.group_mail_receiver.arn}"
  principal     = "s3.amazonaws.com"
  source_arn    = "${aws_s3_bucket.email.arn}"
}
