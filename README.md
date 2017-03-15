# group-mailer

Enables super admins to send email to groups in a Rabble Rouser instance.

## Setup

* Get zone id (from a list of hosted zones):

        aws route53 list-hosted-zones

* Verify domain:

        aws ses verify-domain-identity --domain <domain.com>

## Make it go

* Build

        ./deploy.sh
