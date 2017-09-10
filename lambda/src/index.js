'use strict';

module.exports = (event, context, callback) => {
  const emailReferences = event.Records.map(record => {
    return {
      bucket: record.s3.bucket.name,
      key: record.s3.object.key,
    };
  });
  callback(null, emailReferences);
};
