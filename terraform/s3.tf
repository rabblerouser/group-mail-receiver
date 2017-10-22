resource "aws_s3_bucket" "email" {
  bucket = "${var.domain}-mail-storage"
  acl    = "private"

  lifecycle_rule = {
    prefix = "*"
    enabled = true

    expiration = {
      days = 1
    }
  }

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
            "Resource": "arn:aws:s3:::${var.domain}-mail-storage/*",
            "Condition": {
                "StringEquals": {
                    "aws:Referer": "${data.aws_caller_identity.current.account_id}"
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
