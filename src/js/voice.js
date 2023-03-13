const synth = window.speechSynthesis;

var botListening = false;
var botSpeaking = false;

navigator.mediaDevices.getUserMedia({ audio: true });

var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

button_listen.addEventListener("click", (e) => {
	if (!botSpeaking && !botListening) {
		tutorial.classList.add("hidden");

		if (synth.speaking) {
			synth.cancel();
		}

		botListening = true;

		chat_answer.innerHTML = "";
		mic_capture.innerHTML = "";

		chat_answer.classList.add("hidden");

		micButtonToggle(true);

		recognition.start();
	} else {
		botListening = false;

		micButtonToggle(false);

		recognition.stop();
	}
});

button_listen_stop.addEventListener("click", (e) => {
	if (botSpeaking) {
		if (synth.speaking) {
			synth.cancel();
		}

		button_listen_stop.classList.add("hidden");
		botSpeaking = false;
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

recognition.addEventListener("end", (e) => {
	if (!botSpeaking) endListen();
});

let messages_saved = JSON.parse(localStorage.getItem("messages")) || [];

var messages = messages_saved.slice();

for (var i = 0; i < system_messages.length; i++) {
	messages.unshift(system_messages[i]);
}

async function endListen() {
	const message_spoken = mic_capture.innerHTML;

	micButtonToggle(false);

	botListening = false;

	if (message_spoken) {
		const message = { role: "user", content: message_spoken };

		botSpeaking = true;

		micButtonEnable(false);

		loading.classList.remove("hidden");

		messages.push(message);

		const dados = {
			model: "gpt-3.5-turbo",
			messages: messages,
			max_tokens: 200,
		};

		const urlencoded = new URLSearchParams();
		urlencoded.append("dados", JSON.stringify(dados));
		urlencoded.append("apikey", `${api_key}`);

		let fetchdata = {
			method: "POST",
			body: urlencoded,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		};

		fetch("src/php/voice.php", fetchdata)
			.then((response) => response.json())
			.then((data) => {
				let choice = JSON.parse(data)
				console.log(choice)
				choice = choice.choices[0].message.content;

				let answer = { role: "assistant", content: choice };

				messages_saved.push(message);
				messages_saved.push(answer);

				localStorage.setItem("messages", JSON.stringify(messages_saved));

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
