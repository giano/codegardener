'use strict';
require('newrelic');
var statik = require('node-static');
var server = statik.Server('.', {
    cache: 7200,
    gzip: true
});
server.listen();
