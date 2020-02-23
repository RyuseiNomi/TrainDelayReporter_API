'use strict';

const request = require('request');
const aws = require('aws-sdk');
const s3 = new aws.S3();

module.exports.getDelayList = function(event, context, callback) {

  var response = {statusCode: null, headers: null, body: null};
  const region = event.queryStringParameters.region;
  const params = {
    Bucket: 'delay-list',
    Key: 'delay-list.json'
  };

  s3.getObject(params, function(err, data){
    if (err) {
      response.body = JSON.stringify(
        {
          error: err
        },
        null,
        2
      );
    } else if (data.Body == null) {
      response.body = JSON.stringify(
        {
          error: "response from S3 is null"
        },
        null,
        2
      );
    } else {
      response.body = JSON.stringify(
        {
          region: region,
          delay_list: JSON.parse(data.Body.toString())
        },
        null,
        2
      );
    }
    response.statusCode = 200;
    response.headers = {
      "Access-Control-Allow-Origin" : "*",
    };
    callback(null, response);
  })
};
