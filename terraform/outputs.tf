output "mail_bucket_arn" {
  value = "${aws_s3_bucket.email_bucket.arn}"
}

output "mail_bucket_name" {
  value = "${aws_s3_bucket.email_bucket.id}"
}

output "auth_token" {
  value = "${random_id.group_mail_receiver_auth_token.hex}"
}
