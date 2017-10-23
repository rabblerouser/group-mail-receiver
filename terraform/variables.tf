variable "ses_region" {
  description = "The AWS region where SES will be used. SES region availability is quite limited"
}

variable "route53_zone_id" {
  description = "An existing Route53 hosted zone, where the SES verification DNS entry should be placed"
  type = "string"
}

variable "domain" {
  description = "The domain where Rabble Rouser is deployed, and where emails will be sent to/from"
}
