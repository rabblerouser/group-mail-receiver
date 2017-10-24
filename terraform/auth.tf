resource "random_id" "group_mail_receiver_auth_token" {
  keepers = {
    # Generate a new token whenever the lambda version changes
    lambda_version = "${data.aws_s3_bucket_object.group_mailer_zip.version_id}"
  }

  # With this length, it's as random as a type-4 UUID
  byte_length = 32
}
