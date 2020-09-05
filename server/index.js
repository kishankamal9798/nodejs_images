/**
 * Require file here
 */
const express = require("express");
const { http } = require("./config/server.config.js");
const app = express();
const { options } = require('./config/server.config.js');
const port = process.env.PORT || 4000;
require("./config/db.config");
const useragent = require('express-useragent');
const bodyParser = require("body-parser");
const uploadRoute = require('./routes/upload.route')
const Fallback = require('express-history-api-fallback');

/**
 * *******************
 */
app.use(express.static('dist'))
app.use(Fallback('index.html', { root: 'dist' }))
app
  .use(bodyParser.json({ limit: "50mb", extended: true }))
  .use(express.static("public"))
  .use(
    bodyParser.urlencoded({
      extended: false,
      limit: "100mb"
    })
  )
  .use(useragent.express())
  .use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
    response.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    response.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken"
    );

    next();
  })

  .use("/upload", uploadRoute)


http.createServer(options, app).listen(port, () => {
  console.info(`Nodejs server is running at http://localhost:${port}`);
});
