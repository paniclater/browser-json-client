module.exports = {
  defaults: {
    async: true,
    data: {},
    end () {},
    error () {},
    headers: [],
    success () {}
  },

  _handleResponse (request, success, error) {
    if (request.readyState === 4) {
      this.defaults.end(request);

      switch (request.status) {
        case 200:
          let response = request.response;

          if (response !== null) {
            try {
              response = JSON.parse(response);
            } catch (e) {
              console.error('Invalid JSON string in mxRequest response', e);
              return false;
            }
          }

          success(response);
          break;
        case 204:
          success({});
          break;
        default:
          error(request);
      }
    }
  },

  _handleTimeout (request, url) {
    console.warn('The request for ' + url + ' timed out at ' + request.timeout + ' seconds.');
  },

  _setHeaders (request, headers) {
    headers.forEach(header => {
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

    request.setRequestHeader('Content-Type', 'application/json');
    request = this._setHeaders(request, options.headers);

    request.send(JSON.stringify(options.data));
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