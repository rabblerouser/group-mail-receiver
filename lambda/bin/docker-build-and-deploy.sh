#!/bin/sh
set -e

docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"

docker build -t rabblerouser/group-mail-reciver .
docker push rabblerouser/gruoup-mail-receiver
