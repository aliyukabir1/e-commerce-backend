const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT);

/// import htttp, and app
// set a const port to either p.e.p or 3000
// use the http to create a server
// server should listen to the port
