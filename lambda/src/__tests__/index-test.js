const handler = require('../index.js');

describe('group-mail-receiver lambda function', () => {
  let request;
  let callback;

  beforeEach(() => {
    request = sinon.stub();
    callback = sinon.spy();
  });

  it('sends the S3 object key to the group-mailer', (done) => {
    const s3Info1 = { bucket: { name: 'bucket-name' }, object: { key: 'first-key' } };
    const s3Info2 = { bucket: { name: 'bucket-name' }, object: { key: 'second-key' } };
    const event = { Records: [{ s3: s3Info1 }, { s3: s3Info2 }] };

    handler(request, 'group-mailer.com/mail')(event, null, (err, result) => {
      expect(request).to.have.been.calledWith({
        method: 'POST',
        uri: 'group-mailer.com/mail',
        body: { s3ObjectKey: 'first-key' },
        json: true,
      });
      expect(request).to.have.been.calledWith({
        method: 'POST',
        uri: 'group-mailer.com/mail',
        body: { s3ObjectKey: 'second-key' },
        json: true,
      });
      expect(err).to.eql(null);
      expect(result).to.eql('ok');
      done()
    });
  });

  it('fails if the request fails', (done) => {
    request.rejects(new Error('Oh noes!'));
    const event = { Records: [{ s3: { object: {} } }] };

    handler(request, 'group-mailer.com/mail')(event, null, (err, result) => {
      expect(err.message).to.eql('Oh noes!');
      expect(result).to.eql(undefined);
      done();
    });
  });
});
