navigator.mediaDevices.getUserMedia({ audio: true });

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const synth = window.speechSynthesis;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

var isListening = false;
var isSpeaking = false;

recognition.addEventListener("result", (e) => {
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	mic_capture.innerHTML = transcript;
});

async function endListen() {
	const message = mic_capture.innerHTML;

	if (message) {
		loading.classList.remove("hidden");

		console.log(api_key);

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

				var result = choice.match(/^[.,:!?]/);
				if (result != null) {
					mic_capture.innerHTML += result;
				}

				choice = choice.replace(/^[.,:!?]+/, "");
				choice = choice.replace(/^(\n)+/, "");

				const frase = new SpeechSynthesisUtterance(choice);
				synth.speak(frase);

				isSpeaking = true;

				button_listen_stop.classList.remove("hidden");
				loading.classList.add("hidden");
				chat_answer.classList.remove("hidden");

				chat_answer.innerHTML = choice;

				typeWrite();
			});
	}

	button_listen.classList.remove("text-red-500");
	button_listen.classList.remove("animate-pulse");
	button_listen.setAttribute("name", "mic");

	isListening = false;
}

recognition.addEventListener("end", (e) => {
	endListen();
});
