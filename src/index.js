'use strict';

module.exports = (s3, request, uri, secret) => (event, context, callback) => {
    const emailEvents = event.Records.map(record => {
        return {
            Bucket: record.s3.bucket.name,
            Key: record.s3.object.key
        };
    });

    const requestAttempts = emailEvents.map(emailRecord => {
        s3.getObject(emailRecord, (err, data) => {
            if(err) {
                return Promise.reject(err);
            }

            console.log("EMAIL CONTENTS:", data);
            const params = {
                method: 'POST',
                uri: uri,
                body: data.Body,
                json: true,
                headers: { Authorization: secret }
            };

            return request(params);
        });
    });

    return Promise.all(requestAttempts)
        .then(() => {
            callback(null, 'ok');
        }).catch(err => {
            console.log("BARF", err);
            callback(err);
        });
};
