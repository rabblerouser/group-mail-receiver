variable "aws_region" {
  default = "us-west-2"
}

variable "route53_zone_id" {
  description = "An existing Route53 hosted zone, where the new DNS entry should be placed"
  type = "string"
}
variable "domain" {
  description = "The domain where Rabble Rouser is deployed, and where emails will be addressed to"
}
variable "ses_verification_token" {
  description = "The token use to verify email domains by SES"
}
variable "tf_state_backend_bucket" {
  description = "The name of the bucket where we store the terraform state file for this repository"
  default = "tf-state--group-mail-receiver"
}
