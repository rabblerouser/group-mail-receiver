'use strict';

module.exports = (s3, request, uri, secret) => (event, context, callback) => {
    const emailEvents = event.Records.map(record => {
        return {
            Bucket: record.s3.bucket.name,
            Key: record.s3.object.key
        };
    });

    const requestAttempts = emailEvents.map(emailRecord => (
        new Promise((resolve, reject) => {
            s3.getObject(emailRecord, (err, data) => {
                if(err) {
                  reject(err);
                } else {
                    console.log("EMAIL CONTENTS:", data);
                    resolve({
                        method: 'POST',
                        uri,
                        body: data.Body,
                        json: true,
                        headers: { Authorization: secret }
                    });
                }
            }) 
        }).then(data => request(data))
    ))

    return Promise.all(requestAttempts)
        .then(() => {
            callback(null, 'ok');
        }).catch(err => {
            console.log("BARF", err);
            callback(err);
        });
};
