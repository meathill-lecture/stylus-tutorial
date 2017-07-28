const liveServer = require('live-server');

let params = {
  "port": 8081,
  "host": "localhost",
  "ignore": ".git,node_modules,styl,app,*.json",
  "logLevel": 1,
  "wait": 1000
};
liveServer.start(params);