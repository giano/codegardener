'use strict';
require('newrelic');
var static = require('node-static');
var server = static.Server('.', {
    cache: 7200,
    gzip: true
});
server.listen();
