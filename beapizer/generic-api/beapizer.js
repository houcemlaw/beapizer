const port = process.env.PORT;
const serverTimeout = +process.env.SERVER_TIMEOUT;
var api_root_resource_path = process.env.API_ROOT_RESOURCE_PATH;

const cert_key = process.env.CERT_KEY;
const tls_cert = process.env.TLS_CERT;
const ca_cert = process.env.CA_CERT;

module.exports = beapizer = () => {
const HOST = '0.0.0.0';
var fs = require('fs');
var https = require('https');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const errorhandler = require('errorhandler');
// const apicache = require('apicache');
const db = require('./persistence/db');
const beapizerAPI = require('./routes/beapizer-api-routes');


const app = express();

// let cache = apicache.middleware;
// middleware to add a simple in-memory cache to the application
// we can use "redis" as well
// app.use(cache('5 minutes'));

global.__basedir = __dirname;

// let o_server = 'localhost';
// let o_port = '4200';
var corsOptions = {
  // origin: `http://${o_server}:${o_port}`,
  origin: true, // sets the origin equals to the requestor origin = res.headers.origin
  methods: ['POST','GET', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions))
app.use(logger('dev'))
if (process.env.NODE_ENV === 'development') {
  // only use in development
app.use(errorhandler())
console.log("Node running in Development Mode");

}

app.use((req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(serverTimeout, () => {
      let err = new Error('[Beapizer] - Request Timed Out! Target Server timeout reached.');
      err.status = 408;
      next(err);
  });
  // Set the server response timeout for all HTTP requests
  res.setTimeout(serverTimeout, () => {
      let err = new Error('[Beapizer] - Beapizer Server response Timed Out! Beapizer Server timeout reached before getting a response.');
      err.status = 503;
      next(err);
  });
  next();
});

db.initializeDataBase(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'})); 

if (!api_root_resource_path || api_root_resource_path===null || api_root_resource_path===""){
  api_root_resource_path = '/beapizer/api';
}

console.info(`Using the root resource path: ======> ${api_root_resource_path}`);
app.use(api_root_resource_path, beapizerAPI);

// Error Handler Middleware
app.use((error, req, res, next)=>{
  console.error(error);
  if (!!error){
      if (error.status && error.message){
        return res.status(error.status).send(error.message);
      } else {
        return res.status(500).send('Internal server error');
      }
  }
});

let key;
let cert;
let ca;
  
  try {
     key = fs.readFileSync(`${cert_key}`, 'utf8');
     cert = fs.readFileSync(`${tls_cert}`, 'utf8');
  }catch(err){
    console.log(`No Certificate found! Running the server in HTTP mode`); 
  }

  if (!cert_key || !tls_cert || !key || !cert){
    app.listen(port, HOST, function(){
      console.info(`\nServer running on port:  ${port} through HTTP`);
      console.info(`API Timeout: ======> ${serverTimeout}`);
  });
  } else {
    try {
        ca = fs.readFileSync(`${ca_cert}`, 'utf8');
      }catch(err){
        console.log(`No CA root certificate found!`); 
      }
      if (!ca || !ca_cert){
        https.createServer({
            key: key,
            cert: cert
          }, app)
          .listen(port, HOST, function () {
            console.info(`Server running on port:  ${port} through HTTPS`);
            console.info(`API Timeout: ======> ${serverTimeout}`);
            console.info(`Running using Self-Signed Certificate \n`);
          })
      } else {
        https.createServer({
            key: key,
            cert: cert,
            ca: ca
          }, app)
          .listen(port, HOST, function () {
            console.info(`Server running on port:  ${port} through HTTPS`);
            console.info(`API Timeout: ======> ${serverTimeout}`);
            console.info(`Running using CA-Signed Certificate \n`);
          })
      }
  
  }
}
