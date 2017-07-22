'use strict';

module.exports = (event, context, callback) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const info = {
    bucket,
    key,
    records: event.Records,
  }
  callback(null, info);
};
