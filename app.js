require("dotenv").config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const { json } = require("body-parser");
const app = express();

const {Configuration, OpenAIApi} = require('openai');

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src")));


var configuration
var openai


app.post("/getAPIkey", (req, res) => {

	const data = req.body

	console.log(data)

	if (data["key"]) {
				
		configuration = new Configuration({
			apiKey : data["key"],
		})

		openai = new OpenAIApi(configuration)

		const response = openai.createCompletion({
			model: "text-davinci-003",
			prompt: "Você é uma pessoa agradável e gentil e está disposta a responder qualquer pergunta.",
			max_tokens: 5,
		})
        .then(data => {
            res.send(true)
        })
        .catch(error => {
			res.send(false)
		});


	} else {
		res.send(false)
	}

})


app.post("/sendvoice", async (req, res) => {
	const { ms, js } = req.body;
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: ms,
		max_tokens: 500,
		temperature: 0.5,
		n: 1,
		presence_penalty: 0.2,
		frequency_penalty: 0.2,
		
	})

	res.send(response["data"])


});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server start: " + PORT));


