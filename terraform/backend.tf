resource "aws_s3_bucket" "tf_state_backend" {
  bucket        = "${var.tf_state_backend_bucket}"
  acl           = "private"
  region        = "${var.aws_region}"
}

terraform {
  backend "s3" {
    # Empty config here because each organisation will configure its own remote state
    # This is done when running `terraform init`
  }
}
