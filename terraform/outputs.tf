output "mail_bucket_arn" {
  value = "${aws_s3_bucket.email_bucket.arn}"
}

output "mail_bucket_name" {
  value = "${aws_s3_bucket.email_bucket.id}"
}
