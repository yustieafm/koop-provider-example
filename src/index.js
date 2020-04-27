/*
  index.js

  This file is required. It's role is to specify configuration settings.

  Documentation: http://koopjs.github.io/docs/usage/provider
*/

// Define the provider path
// /:name/:hosts?/:disableIdParam?/FeatureServer/:layer/:method
// e.g. /example/FeatureServer/0/query
const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const Koop = require('koop')
const koop = new Koop()
const provider = {
  type: 'provider',
  name: 'example',
  hosts: false, // if true, also adds disableIdParam
  disableIdParam: true, // if true, adds to path and req.params
  Controller: require('./controller'),
  Model: require('./model'),
  routes: require('./routes'),
  version: require('../package.json').version
}
koop.register(provider)
app.use('/koop', koop.server)
https.createServer({
  key: fs.readFileSync("../server.key"),
  cert: fs.readFileSync("../server.cert")}, app).listen(8443);

module.exports = provider
