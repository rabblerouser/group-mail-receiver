// const run = require('@rabblerouser/local-kinesis-lambda-runner');
// run(lambda);
const request = require('request-promise-native');
const lambda = require('./src');
const groupMailerEndpoint = 'http://localhost:3002/mail';

const lambdaCallback = (err, result) => (
  err ? console.error('Lambda failed:', err.message) : console.log('Lambda succeeded:', result)
);

const key = process.argv[2];
const record = { s3: { object: { key } } };

lambda(request, groupMailerEndpoint)({ Records: [record] }, null, lambdaCallback);
