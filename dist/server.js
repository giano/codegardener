'use strict';
require('newrelic');
var statik = require('statik');
var server = statik.createServer('.', {
    cache: 7200,
    gzip: true
});
server.listen();
