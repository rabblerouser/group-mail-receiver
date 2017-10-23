resource "aws_route53_record" "ses_verification" {
  zone_id = "${var.route53_zone_id}"
  name = "_amazonses.${var.domain}"
  type = "TXT"
  ttl = "300"
  records = [
    "${aws_ses_domain_identity.ses_domain_entity.verification_token}"
  ]
}

resource "aws_route53_record" "mail" {
  zone_id = "${var.route53_zone_id}"
  name = "${var.domain}"
  type = "MX"
  ttl = "300"
  records = [
    "10 inbound-smtp.${var.ses_region}.amazonaws.com"
  ]
}
