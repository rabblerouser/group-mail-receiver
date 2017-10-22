const request = require('request-promise-native');
const handler = require('./src');

const groupMailerEndpoint = process.env.FORWARD_TO_ENDPOINT;

exports.handler = handler(request, groupMailerEndpoint);
