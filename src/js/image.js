


var botListening = false;

var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

button_listen.addEventListener("click", (e) => {

	if (!botListening) {

		tutorial.classList.add("hidden");

		botListening = true;

		mic_capture.innerHTML = "";

		micButtonToggle(true);

		recognition.start();
	} else {

		botListening = false;

		micButtonToggle(false);

		recognition.stop();
	}

});

recognition.addEventListener("result", (e) => {
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	mic_capture.innerHTML = transcript;
});

recognition.addEventListener("speechend", (e) => {
	endListen();
});

async function endListen() {
	const message = mic_capture.innerHTML;

	micButtonToggle(false);

	botListening = false;

	if (message) {
		
		showLoading(true)

		event.preventDefault();

		const urlencoded = new URLSearchParams();

		urlencoded.append("message", message);
		urlencoded.append("apikey", `${api_key}`);
		urlencoded.append("size", "512x512");

		let fetchdata = {
			method: "POST",
			body: urlencoded,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		};

		fetch("src/php/image.php", fetchdata)
			.then((response) => response.json())
			.then((data) => {

				let choice = JSON.parse(data);

				console.log(choice);
				
				showLoading(false)

				chat_answer.classList.remove("hidden");

				image.src = choice.data[0].url;
				
			})
			.catch((error) => {
				
				console.log("error", error);

				showLoading(false)

			});

	}
}
