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
      console.log(err);
    }
    var result_json = JSON.parse(data.Body.toString());
    response.body = JSON.stringify(result_json);
    response.statusCode = 200;
    response.headers = {
      "Access-control-Allow-Origin": "*",
    };
    callback(null, response);
  })
};
