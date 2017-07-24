variable "aws_account_id" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "us-west-2"
}

variable "route53_zone_id" {
  description = "An existing Route53 hosted zone, where the new DNS entry should be placed"
  type = "string"
}
variable "mail_domain_name" {
  description = "The domain that should accept mail intended for RR groups"
}
variable "ses_verification_token" {
  description = "The token use to verify email domains by SES"
}

variable "group_mail_s3_bucket_name" {
  description = "The bucket that (temporarily) store incoming mail"
}

variable "rabble_rouser_artefact_bucket" {
  description = "The name of the bucket that Rabble Rouser"
  default = "rabblerouser-ses-artefacts"
}
variable "rabble_rouser_artefact_lambda_directory" {
  description = "The directory in the Rabble Rouser artefact bucket to put lambdas"
  default = "lambdas"
}
variable "tf_state_backend_bucket" {
  description = "The name of the bucket where we store the terraform state file for this repository"
  default = "tf-state--group-mail-receiver"
}

variable "forward_to" {
  description = "The endpoint for group-mailer where email references should be forwarded to, e.g. https://group-mailer.something.com/mail"
  type = "string"
}
