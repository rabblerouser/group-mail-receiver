'use strict';

const getEmailFromS3 = (s3, emailRecord) => {
    return new Promise((resolve, reject) => {
        s3.getObject(emailRecord, (err, data) => {
            if(err) {
                reject(err);
            } else {
                console.log("EMAIL CONTENTS:", data);
                resolve(data);
            }
        }); 
    });
}

const createPost = (emailRecord, uri, secret) => {
  return {
      method: 'POST',
      uri,
      body: emailRecord.Body,
      json: true,
      headers: { Authorization: secret }
  };
}

module.exports = (s3, request, uri, secret) => (event, context, callback) => {
    const emailEvents = event.Records.map(record => {
        return {
            Bucket: record.s3.bucket.name,
            Key: record.s3.object.key
        };
    });

    const requestAttempts = emailEvents.map(emailRecord => 
        getEmailFromS3(s3, emailRecord)
        .then(emailRecord => createPost(emailRecord, uri, secret))
        .then(postData => request(postData)))

    return Promise.all(requestAttempts)
        .then(() => {
            callback(null, 'ok');
        }).catch(err => {
            console.log("BARF", err);
            callback(err);
        });
};
