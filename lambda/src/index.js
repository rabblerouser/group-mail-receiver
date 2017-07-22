'use strict';

module.exports = (event, context, callback) => {
  const emailReferences = event.Records.map(record => {
    return {
      bucket: record.s3.bucket.name,
      key: decodeURIComponent(record.s3.object.key.replace(/\+/g, ' ')),
    };
  });
  callback(null, emailReferences);
};
