module.exports = (request, groupMailerEndpoint) => (event, context, callback) => {
  console.log('EVENT', event)
  const postMail = (promise, record) => ( promise.then(() => (
    request({
      method: 'POST',
      uri: groupMailerEndpoint,
      body: { s3ObjectKey: record.s3.object.key },
      json: true,
    })
  )));

  event.Records.reduce(postMail, Promise.resolve())
    .then(
      () => callback(null, 'ok'),
      err => callback(err)
    );
};
