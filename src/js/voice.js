
const synth = window.speechSynthesis;

var botListening = false;
var botSpeaking = false;


navigator.mediaDevices.getUserMedia({ audio: true });

var recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

button_listen.addEventListener("click", e => {

    if (!botSpeaking && !botListening) {

        tutorial.classList.add("hidden")

        if (synth.speaking) {
            synth.cancel()
        }

        botListening = true

        chat_answer.innerHTML = ""
        mic_capture.innerHTML = ""
        
        chat_answer.classList.add("hidden")

        micButtonToggle(true)
        
        recognition.start();

    } else {

        botListening = false
        
        micButtonToggle(false)
        
        recognition.stop()

    }

})

button_listen_stop.addEventListener("click", e => {

    if (botSpeaking) {

        if (synth.speaking) {
            synth.cancel()
        }

        button_listen_stop.classList.add("hidden")
        botSpeaking = false

    }

})

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
	
	if (message) {
		botSpeaking = true;
		
		loading.classList.remove("hidden");

		let messages = JSON.parse(localStorage.getItem("messages"))
		messages.push(
			{"role" : "user", "content" : message}
		)

		const dados = {
			"model" : "gpt-3.5-turbo",
			"messages" : messages,
			"max_tokens" : 500,
		}


		const urlencoded = new URLSearchParams();
		urlencoded.append("dados", dados);
		urlencoded.append("apikey", "${api_key}");


		let fetchdata = {
			method: "POST",
			body: urlencoded,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		};

		fetch("https://api.openai.com/v1/chat/completions", fetchdata)
		.then((response) => response.json())
		.then((data) => {
			
			let choice = data.choices[0].message.content;

			console.log(choice)

			messages.push(
				{"role" : "assistant", "content" : choice}
			)

			messages = JSON.stringify(messages)

			localStorage.setItem("messages", messages)

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




