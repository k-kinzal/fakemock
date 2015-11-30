'use strict';
// require
Object.keys(require.cache).forEach(function(path) {
  /aws\-sdk/.test(path) && delete(require.cache[path]);
});
var AWS    = require('aws-sdk');
Object.keys(require.cache).forEach(function(path) {
  /aws\-sdk/.test(path) && delete(require.cache[path]);
});
var extend = require('util')._extend;
// initialize
var responses = {};
var helpers = {};
// create AWS stub response
helpers.AWS = AWS;
helpers.AWS.Request.prototype.send = function(callback) {
  var name = this.service.serviceIdentifier + '.' + this.operation;
  var resps = responses[name] || [];
  if (resps.length === 0) {
    throw new ReferenceError('Has not set response `' + name + '`');
  }

  var resp = resps.shift();

  var response = new AWS.Response();
  response.request = this.httpRequest;
  response.data = resp.type === 'success' ? resp.data : null;
  response.error = resp.type === 'error' ? resp.data : null;
  response.retryCount = 0;
  response.redirectCount = 0;

  callback.call(response, response.error, response.data);
};

helpers.mockResponse = function(name, data) {
  var resps = responses[name] || [];
  resps.push({type: 'success', data: data});

  responses[name] = resps;
};

helpers.mockErrorResponse = function(name, data) {
  var resps = responses[name] || [];
  var error = new Error(data.message);

  resps.push({type: 'error', data: extend(error, data)});

  responses[name] = resps;
};

helpers.reflash = function() {
  responses = [];
};

module.exports = helpers;
