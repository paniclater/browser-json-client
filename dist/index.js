'use strict';

module.exports = {
  defaults: {
    async: true,
    data: {},
    error: function error() {},
    headers: [],
    success: function success() {}
  },

  _handleResponse: function _handleResponse(request, success, error) {
    if (request.readyState === 4) {
      this.end(request);

      if (request.status === 200) {
        var response = request.response;

        try {
          response = JSON.parse(response);
        } catch (e) {
          console.error('Invalid JSON string in mxRequest response', e);
          return false;
        }

        success(response);
      } else {
        error(JSON.parse(request.response));
      }
    }
  },

  _handleTimeout: function _handleTimeout(request, url) {
    console.warn('The request for ' + url + ' timed out at ' + request.timeout + ' seconds.');
  },

  _setHeaders: function _setHeaders(request, headers) {
    headers.every(function (header) {
      request.setRequestHeader(header.name, header.value);
    });

    return request;
  },

  _getOptions: function _getOptions(requestOptions) {
    var options = this.defaults;

    for (var key in requestOptions) {
      if (requestOptions.hasOwnProperty(key)) {
        if (key === 'headers') {
          options[key] = options[key].concat(requestOptions[key]);
        } else {
          options[key] = requestOptions[key];
        }
      }
    }

    return options;
  },

  _makeRequest: function _makeRequest(url, requestOptions, type) {
    var options = this._getOptions(requestOptions);

    var request = new XMLHttpRequest();

    request.onreadystatechange = this._handleResponse.bind(this, request, options.success, options.error);
    request.ontimeout = this._handleTimeout.bind(this, request, url);

    request.open(type, url, options.async);

    request.setRequestHeader('Content-Type', 'application/json');
    request = this._setHeaders(request, options.headers);

    request.send(JSON.stringify(options.data));
  },

  end: function end() {},

  get: function get(url, requestOptions) {
    this._makeRequest(url, requestOptions, 'GET');
  },

  post: function post(url, requestOptions) {
    this._makeRequest(url, requestOptions, 'POST');
  },

  put: function put(url, requestOptions) {
    this._makeRequest(url, requestOptions, 'PUT');
  },

  del: function del(url, requestOptions) {
    this._makeRequest(url, requestOptions, 'DELETE');
  }
};

//intended to be set by the user
