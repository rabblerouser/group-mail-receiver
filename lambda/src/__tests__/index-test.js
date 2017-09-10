'use strict';

const handler = require('../index.js');

describe('group-mail-receiver lambda function', () => {
  describe('when a valid s3 event triggers the lambda', () => {
    let callback;
    beforeEach(() => {
        callback = sinon.spy();
    });

    it('returns the bucket name, key, and all records for the event', () => {
      const bucketName = "name of the bucket";
      const objectKey1 = "key of the first file";
      const objectKey2 = "key of the second file";
      const s3Info1 = { "bucket": { "name": bucketName }, "object": { "key": objectKey1 } };
      const s3Info2 = { "bucket": { "name": bucketName }, "object": { "key": objectKey2 } };
      const event = { "Records": [{ "s3": s3Info1 }, { "s3": s3Info2 }] };

      const expectedEmailReferences = [
        { bucket: bucketName, key: objectKey1 },
        { bucket: bucketName, key: objectKey2 },
      ];

      handler(event, null, callback);

      expect(callback).to.have.been.calledWith(null, expectedEmailReferences);
    });
  });
});
