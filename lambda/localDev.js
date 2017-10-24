const request = require('request-promise-native');
const lambda = require('./src');
const groupMailerEndpoint = 'http://localhost:3002/mail';
const authToken = process.env.AUTH_TOKEN;

const lambdaCallback = (err, result) => (
  err ? console.error('Lambda failed:', err.message) : console.log('Lambda succeeded:', result)
);

const key = process.argv[2];
const record = { s3: { object: { key } } };

lambda(request, groupMailerEndpoint, authToken)({ Records: [record] }, null, lambdaCallback);
