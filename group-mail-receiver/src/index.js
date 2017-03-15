'use strict';

module.exports = (request) => (event, context, callback) => {
    console.log("SES notification", JSON.stringify(event, null, 2));
    callback(null, {});
};
