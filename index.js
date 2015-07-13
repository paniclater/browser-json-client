module.exports = {
  defaults: {
    async: true,
    data: {},
    error () {},
    headers: [],
    success () {}
  },

  _handleResponse (request, success, error) {
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

  _handleTimeout (request, url) {
    console.warn('The request for ' + url + ' timed out at ' + request.timeout + ' seconds.');
  },

  _setHeaders (request, headers) {
    headers.every(header => {
      request.setRequestHeader(header.name, header.value);
    });

    return request;
  },

  _getOptions (requestOptions) {
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

  _makeRequest (url, requestOptions, type) {
    const options = this._getOptions(requestOptions);

    let request = new XMLHttpRequest();

    request.onreadystatechange = this._handleResponse.bind(this, request, options.success, options.error);
    request.ontimeout = this._handleTimeout.bind(this, request, url);

    request.open(type, url, options.async);

    request = this._setHeaders(request, options.headers);

    request.send(JSON.stringify(options.data));
  },

  end () {
    //intended to be set by the user
  },

  get (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'GET');
  },

  post (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'POST');
  },

  put (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'PUT');
  },

  del (url, requestOptions) {
    this._makeRequest(url, requestOptions, 'DELETE');
  }
};