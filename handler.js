'use strict';

const request = require('request');
const aws = require('aws-sdk');
const s3 = new aws.S3();

module.exports.getDelayList = function(event, context, callback) {

  var response = {statusCode: null, headers: null, body: null};
  var response_error = '';
  const region = event.queryStringParameters.region;
  const params = {
    Bucket: 'delay-list',
    Key: 'delay-list.json'
  };

  s3.getObject(params, function(err, data){
    response.statusCode = 200;

    if (err) {
      response_error = err;
      response.statusCode = 500;
    }

    response.body = JSON.stringify(
      {
        region: region,
        delay_list: JSON.parse(data.Body.toString()),
        error: response_error
      },
      null,
      2
    );

    response.headers = {
      "Access-Control-Allow-Origin" : "*",
    };
    callback(null, response);
  })
};
