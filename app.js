require("dotenv").config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const { json } = require("body-parser");
const { response } = require("express");
const app = express();
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 100);
	console.log("oi");
});


//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src")));


const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log("server start"));
