provider "aws" {
  region = "${var.aws_region}"
}

# This allows us to look up the AWS account id dynamically
data "aws_caller_identity" "current" {}
