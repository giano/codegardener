'use strict';
require('newrelic');
var statik = require('statik');
var server = statik.createServer('.');
server.listen();
