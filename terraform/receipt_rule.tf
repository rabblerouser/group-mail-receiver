resource "aws_ses_domain_identity" "ses_domain_entity" {
  provider = "aws.ses_region"
  domain = "${var.domain}"
}

resource "aws_ses_receipt_rule_set" "group_mail_rules" {
  provider = "aws.ses_region"
  rule_set_name = "group_mail_rules"
}

resource "aws_ses_active_receipt_rule_set" "group_mail_rules_active" {
  provider = "aws.ses_region"
  rule_set_name = "${aws_ses_receipt_rule_set.group_mail_rules.rule_set_name}"
}

resource "aws_ses_receipt_rule" "store" {
  provider      = "aws.ses_region"
  name          = "process_group_mail"
  rule_set_name = "${aws_ses_receipt_rule_set.group_mail_rules.rule_set_name}"
  recipients    = ["${var.domain}"]
  enabled       = true
  tls_policy    = "Require"
  scan_enabled  = true

  s3_action {
    bucket_name = "${aws_s3_bucket.email_bucket.bucket}"
    position    = "1"
  }
}
