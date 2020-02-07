'use strict';

const request = require('request');
const aws = require('aws-sdk');
var url = 'https://tetsudo.rti-giken.jp/free/delay.json';

module.exports.getDelayList = async event => {

  request.get({
    uri: url,
    headers: {'Content-type': 'application/json'},
    json: true
  }, function(err, req, data){
      console.log(data);
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  return response;
};
