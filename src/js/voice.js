
const synth = window.speechSynthesis;

var botListening = false;
var botSpeaking = false;


navigator.mediaDevices.getUserMedia({ audio: true });

var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;


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

recognition.addEventListener("end", (e) => {
	if (!botSpeaking)
		endListen();
});


async function endListen() {

	const message = mic_capture.innerHTML;

	micButtonToggle(false)

	botListening = false;
	botSpeaking = true;

	if (message) {

		loading.classList.remove("hidden");

		fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${api_key}`,
			},
			body: JSON.stringify({
				model: "text-davinci-003",
				prompt: message,
				max_tokens: 500,
				temperature: 0.5,
				presence_penalty: 0.2,
				frequency_penalty: 0.2,
				n: 1,
			}),
		})
		.then((response) => response.json())
		.then((data) => {
			
			let choice = data.choices[0].text;

			const result = choice.match(/^[.,:!?]/);

			if (result != null) {
				mic_capture.innerHTML += result;
			}

			choice = choice.replace(/^[.,:!?]+/, "");
			choice = choice.replace(/^(\n)+/, "");

			const frase = new SpeechSynthesisUtterance(choice);
			synth.speak(frase);

			button_listen_stop.classList.remove("hidden");
			
			loading.classList.add("hidden");

			chat_answer.classList.remove("hidden");
			chat_answer.innerHTML = choice;

			typeWrite();
		});
	}	
}




