# group-mailer

Enables super admins to send email to groups in a Rabble Rouser instance.

## Setup

* Get zone id (from a list of hosted zones):

        aws route53 list-hosted-zones

* Verify domain:

        aws ses verify-domain-identity --domain <domain.com>

## Deployment

#### Initial

To create/modify the AWS resources involved with this lambda, run `deploy.sh`, which uses terraform. This repo is a little different from most of the others, because it contains its own terraform code, rather than having it in the `infra` repo. It's just a little something we're trying out.

#### Updating the lambda code

The CI pipeline will package the code into a .zip file and upload it to S3, but getting the lambda to pick up the changes is a different matter. Right now, the way to do that is with a manual command. We're looking at automating it.

    aws lambda update-function-code --function-name=group-mail-receiver --s3-bucket=[S3 BUCKET NAME] --s3-key=[FILE PATH WITHIN S3 BUCKET]
