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


app.post("/sendvoice", (req, res) => {
	const { ms, js } = req.body;
	console.log(ms);
	
	const msData = {

		prompt: ms,
		max_tokens: 100,
		n: 1,


	};

	const msDatapost = JSON.stringify(msData);
	const options = {
		url: process.env.chatUrl,
		method: "POST",
		headers: {
			"Content-Type" : "application/json",
			Authorization: `Bearer ${process.env.Chatkey}`,
		},
		body: msDatapost,
	};
	if (ms) {
		//working
		request(options, (err, response, body) => {
			if (err) {
				res.join({ error: err });
			} else {
				console.log("hi");
				if (js) {
					console.log(body)
					res.json(body);
				} else {
					res.redirect("#sucess");
				}
			}
		});
	} else {
		res.status(404).send({ message: "Failed" });
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server start"));


