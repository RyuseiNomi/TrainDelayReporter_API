'use strict';

const request = require('request');
const aws = require('aws-sdk');

module.exports.getDelayList = function(event, context, callback) {

  var delay_json_url = 'https://tetsudo.rti-giken.jp/free/delay.json';
  var response = {statusCode: null, body: null};
  var headers = {
    'Content-type': 'application/json'
  };
  var options = {
    url: delay_json_url,
    method: 'GET',
    headers: headers,
    json: true
  };

  request(options, function(err, req, data){
    if (err != null) {
      console.log(err);
    }
    response.statusCode = 200;
    response.body = JSON.stringify(
      {
        delay_list: data,
      },
      null,
      2
    );
    console.log(data);
    callback(null, response);
  });
};
