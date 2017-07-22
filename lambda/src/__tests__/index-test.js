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
      const object_key = "key_of_the_file";
      const s3_info = {
          "bucket": {"name": bucketName},
          "object": { "key": object_key }
      };
      const records = [{ "s3": s3_info }]
      const event = {"Records": records};

      let expected_info = {
        bucket: bucketName,
        key: object_key,
        records: records,
      };

      handler(event, null, callback);

      expect(callback).to.have.been.calledWith(null, expected_info);
    });
  });
});
