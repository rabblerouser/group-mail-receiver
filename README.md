# group-mailer

Enables super admins to send email to groups in a Rabble Rouser instance.

## Setup

* Get zone id (from a list of hosted zones):

        aws route53 list-hosted-zones

* Get an SES verification token:

        aws ses verify-domain-identity --domain <domain.com>

## Deployment

#### Initial

To create/modify the AWS resources involved with this lambda, run `deploy.sh`, which uses terraform. This repo is a little different from most of the others, because it contains its own terraform code, rather than having it in the `infra` repo. It's just a little something we're trying out.
