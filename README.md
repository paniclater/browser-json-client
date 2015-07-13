## Installation
```
npm install browser-json-client
```

## Usage
This module is built to work specically with JSON APIs. Because of this, the `Content-Type` header is set to `application/json` by default. It also assumes that the api responses are JSON objects.

```javascript
var client = require('browser-json-client');

// default options
var options = {
  async: true,
  data: {},
  error: function () {},
  headers: [],
  success: function () {}
};

client.get('http://youapiendpoint.com/whatever', options);
```

## Options
Each request takes an options object. The available options are:

#### `async` (boolean)
Determines if the request should be made asynchronously

#### `data` (object)
A JSON object that will be sent with the http request

#### `error` (function)
A function that will be called if the request responds with an error

#### `headers` (array)
An array of objects that will be set as headers on the request. Each object should contain a `name` and `value` property.

```javascript
{
  headers: [
    { name: 'Context-Type', value: 'application/json' }
  ]
}
```

#### `success` (function)
A function that will be called if the request is successful. It returns the response body as a JSON object.

```javascript
{
  success: function (response) {
    console.log(response.yourData);
  }
}
```

## Methods
#### `.get(url, options)`
This sends a GET request to the provided URL.

```javascript
var client = require('browser-json-client');

client.get('http://youapiendpoint.com/whatever', {
  error: function (response) {
    // response is a JSON object
  },
  success: function (response) {
    // response is a JSON object
  }
});
```

#### `.post(url, options)`
This sends a POST request to the provided URL.

```javascript
var client = require('browser-json-client');

client.post('http://youapiendpoint.com/whatever', {
  error: function (response) {
    // response is a JSON object
  },
  success: function (response) {
    // response is a JSON object
  }
});
```

#### `.put(url, options)`
This sends a PUT request to the provided URL.

```javascript
var client = require('browser-json-client');

client.put('http://youapiendpoint.com/whatever', {
  error: function (response) {
    // response is a JSON object
  },
  success: function (response) {
    // response is a JSON object
  }
});
```

#### `.del(url, options)`
This sends a DELETE request to the provided URL.

```javascript
var client = require('browser-json-client');

client.del('http://youapiendpoint.com/whatever', {
  error: function (response) {
    // response is a JSON object
  },
  success: function (response) {
    // response is a JSON object
  }
});
```

