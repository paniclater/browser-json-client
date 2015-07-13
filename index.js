module.exports = {
  defaults: {
    async: true,
    data: {},
    error: function () {},
    headers: [],
    success: function () {}
  },

  _handleResponse: function (request, success, error) {
    if (request.readyState === 4) {
      this.end(request);

      if (request.status === 200) {
        let response = request.response;

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

  _handleTimeout: function (request, url) {
    console.warn('The request for ' + url + ' timed out at ' + request.timeout + ' seconds.');
  },

  _setHeaders: function (request, headers) {
    headers.every(header => {
      request.setRequestHeader(header.name, header.value);
    });

    return request;
  },

  _getOptions: function (requestOptions) {
    const options = this.defaults;

    for (const key in requestOptions) {
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

  _makeRequest: function (url, requestOptions, type) {
    const options = this._getOptions(requestOptions);

    let request = new XMLHttpRequest();

    request.onreadystatechange = this._handleResponse.bind(this, request, options.success, options.error);
    request.ontimeout = this._handleTimeout.bind(this, request, url);

    request.setRequestHeader('Content-Type', 'application/json');
    request = this._setHeaders(request, options.headers);

    request.open(type, url, options.async);

    request.send(JSON.stringify(options.data));
  },

  end: function () {
    //intended to be set by the user
  },

  get: function (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'GET');
  },

  post: function (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'POST');
  },

  put: function (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'PUT');
  },

  del: function (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'DELETE');
  }
};