# group-mail-receiver

Enables super admins to send email to groups in a Rabble Rouser instance.

This is a lambda function, which is configured to be run whenever an email is sent by a Rabble Rouser admin to a special
email address. It forwards the request on to the group-mailer, which eventually results in the original email being
forwarded to the relevant members.

## Local development

From the `lambda` subdirectory you can do `yarn simulate some-s3-object` to invoke the lambda locally with a mock
payload. It will try to send a POST request to the group-mailer, which it assumes is running at `localhost:3002`. For
instructions on running the group-mailer and associated services, see the README for the
[group-mailer](https://github.com/rabblerouser/group-mailer), or the new [Cage project](https://github.com/camjackson/rabblerouser).

## Deployment

This application contains its own terraform code for deploying itself, which is a new pattern we're trying. However,
the terraform code here should not be run directly. Instead, it should be used as a module, which is invoked from the
main [infra repo](https://github.com/rabblerouser/infra). See that repo for instructions on how to deploy an entire
Rabble Rouser stack
