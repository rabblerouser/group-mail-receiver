module.exports = (request, groupMailerEndpoint, authToken) => (event, context, callback) => {
  const postMail = (promise, record) => ( promise.then(() => (
    request({
      method: 'POST',
      uri: groupMailerEndpoint,
      body: { s3ObjectKey: record.s3.object.key },
      json: true,
      headers: {
        Authorization: authToken
      }
    })
  )));

  event.Records.reduce(postMail, Promise.resolve())
    .then(
      () => callback(null, 'ok'),
      err => callback(err)
    );
};
