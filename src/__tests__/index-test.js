'use strict';

const handler = require('../index.js');

describe('handler', () => {
    let s3;
    let request;
    let callback;

    const event = {
        "Records": [
            {
                "s3": {
                    "bucket": {"name": "bucket"},
                    "object": {
                        "key": "key",
                        "size": 42
                    }
                }
            }
        ]
    };

    beforeEach(() => {
        s3 = {
            getObject: sinon.stub()
        };

        request = sinon.stub().returns(Promise.resolve());
        callback = sinon.spy();
    });

    it('gets the email body from the s3 bucket', () => {
        s3.getObject.yields(null, {'Body': 's3Data'});

        return handler(s3, request, 'http://mail', 'secretTeapot')(event, null, callback).then(() => {
            expect(request).to.have.been.calledWith({
                method: 'POST',
                uri: 'http://mail',
                body: 's3Data',
                json: true,
                headers: { Authorization: 'secretTeapot' }
            });
            expect(callback).to.have.been.calledWith(null, 'ok');
        });
    });

    xit('barfs if there are errors getting the email from s3', () => {
        s3.getObject.yields('barf', null);

        return handler(s3, request, 'http://mail', 'secretTeapot')(event, null, callback).then(() => {
            expect(callback).to.have.been.calledWith('barf');
        });
    });

    xit('barfs if the requests are not successful', () => {
        s3.getObject.yields(null, 's3Data');
        request.returns(Promise.reject('Uh-oh!'));

        return handler(s3, request, 'http://mail', 'secretTeapot')(event, null, callback).then(() => {
            expect(callback).to.have.been.calledWith('Uh-oh!');
        }).then(done);
    });

});
