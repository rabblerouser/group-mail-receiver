const handler = require('../index.js');

describe('group-mail-receiver lambda function', () => {
  let request;
  let callback;
  const console = { log: _ => _, warn: _ => _, error: _ => _ };

  beforeEach(() => {
    request = sinon.stub();
    callback = sinon.spy();
  });

  it('sends the S3 object key to the group-mailer', () => {
    request.resolves();
    const s3Info1 = { bucket: { name: 'bucket-name' }, object: { key: 'first-key' } };
    const s3Info2 = { bucket: { name: 'bucket-name' }, object: { key: 'second-key' } };
    const event = { Records: [{ s3: s3Info1 }, { s3: s3Info2 }] };

    return handler(request, 'group-mailer.com/mail', 'secret', console)(event, null, callback)
      .then(() => {
        expect(request).to.have.been.calledWith({
          method: 'POST',
          uri: 'group-mailer.com/mail',
          body: { s3ObjectKey: 'first-key' },
          json: true,
          headers: { Authorization: 'secret' },
        });
        expect(request).to.have.been.calledWith({
          method: 'POST',
          uri: 'group-mailer.com/mail',
          body: { s3ObjectKey: 'second-key' },
          json: true,
          headers: { Authorization: 'secret' },
        });
        expect(callback).to.have.been.calledWith(null, 'ok');
    });
  });

  it('fails if the request fails', () => {
    const error = new Error('Oh noes!')
    request.rejects(error);
    const event = { Records: [{ s3: { object: { key: 'the-key' } } }] };

    return handler(request, 'group-mailer.com/mail', 'secret', console)(event, null, callback)
      .then(() => {
        expect(callback).to.have.been.calledWith(error);
      });
  });
});
