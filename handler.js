'use strict';

const request = require('request');
const aws = require('aws-sdk');
const s3 = new aws.S3();
var result_object = 'default';

module.exports.getDelayList = function(event, context, callback) {

  const region = event.queryStringParameters.region;
  const params = {
    Bucket: 'delay-list',
    Key: 'delay-list.json'
  };

  s3.getObject(params, function(err, data){
    if (err) {
      console.log('a');
      result_object = err;
    }
    console.log('b');
    result_object = JSON.parse(data.Body.toString());
  })

  var response = {
    statusCode: 200,
    headers: {},
    body: result_object
  };

  console.log('c');
  callback(null, response);
};
