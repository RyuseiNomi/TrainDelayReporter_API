'use strict';

const request = require('request');
const aws = require('aws-sdk');
var url = 'https://tetsudo.rti-giken.jp/free/delay.json';

module.exports.getDelayList = async event => {

  var result_json = '';
  var headers = {
    'Content-type': 'application/json'
  };
  var options = {
    url: url,
    method: 'GET',
    headers: headers,
    json: true
  };

  request(options, function(err, req, data){
    if (err != null) {
      console.log(err);
    }
    console.log(data);
    result_json = data;
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        result: result_json,
        input: event,
      },
      null,
      2
    ),
  };

  return response;
};
