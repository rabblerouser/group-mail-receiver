const request = require('request-promise-native');
const handler = require('./src');

const groupMailerEndpoint = process.env.FORWARD_TO_ENDPOINT;
const authToken = process.env.AUTH_TOKEN;

exports.handler = handler(request, groupMailerEndpoint, authToken, console);
