module.exports = (request, groupMailerEndpoint, authToken, console) => (event, context, callback) => {
  console.log(`group-mail-receiver received ${event.Records.length} event(s)`);

  const postMail = (promise, record) => (
    promise.then(() => {
      const s3ObjectKey = record.s3.object.key;
      console.log(`Forwarding email at ${s3ObjectKey}`);
      return request({
        method: 'POST',
        uri: groupMailerEndpoint,
        body: { s3ObjectKey },
        json: true,
        headers: {
          Authorization: authToken
        }
      })
        .then(() => console.log(`Received success response from API for email at ${s3ObjectKey}`))
        .catch((e) => {
          console.error(`Error sending email to API. Email at: ${s3ObjectKey}, Error: ${e}`);
          throw e;
        });
    })
  );

  event.Records.reduce(postMail, Promise.resolve())
    .then(
      () => callback(null, 'ok'),
      err => callback(err)
    );
};
