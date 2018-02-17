const request = require('request-promise-native');
const lambda = require('./src');
const groupMailerEndpoint = process.env.FORWARD_TO_ENDPOINT || 'http://localhost:3002/mail';
const authToken = process.env.AUTH_TOKEN || 'secret';

const lambdaCallback = (err, result) => (
  err ? console.error('Lambda failed:', err.message) : console.log('Lambda succeeded:', result)
);

const key = process.argv[2];

if (!key) {
  console.error('Please provide the S3 object key as a command-line argument');
  process.exit(1);
}

const record = { s3: { object: { key } } };

lambda(request, groupMailerEndpoint, authToken, console)({ Records: [record] }, null, lambdaCallback);
