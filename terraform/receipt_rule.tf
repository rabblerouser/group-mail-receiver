resource "aws_ses_receipt_rule_set" "main" {
  rule_set_name = "group_mail_rules"
}

resource "aws_ses_active_receipt_rule_set" "main" {
  rule_set_name = "group_mail_rules"
}

resource "aws_ses_receipt_rule" "store" {
  name          = "process_group_mail"
  rule_set_name = "group_mail_rules"
  recipients    = ["${var.domain}"]
  enabled       = true
  tls_policy    = "Require"
  scan_enabled  = true

  s3_action {
    bucket_name = "${aws_s3_bucket.email.bucket}"
    position    = "1"
  }
}
