

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const synth = window.speechSynthesis;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

var isListening = false
var isSpeaking = false


recognition.addEventListener("result", (e) => {
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	mic_capture.innerHTML = transcript;
});


function endListen() {
        
    const message = mic_capture.innerHTML

    if (message) {

        loading.classList.remove("hidden")

        let fetchData = {

            method : "POST",
            body : JSON.stringify({
                ms : message,
                js : true
            }),
            headers : {
                "Content-Type" : "application/json"
            }

        }
        
        fetch('/sendvoice', fetchData)
        .then(res => res.json())
        .then(data => {

            let choice = data.choices[0].text
            
            
            var result = choice.match(/^[.,:!?]/)
            if (result != null) {
                mic_capture.innerHTML += result
            }


            choice = choice.replace(/^(\?)+/, '')
            choice = choice.replace(/^(\n)+/, '')


            const frase = new SpeechSynthesisUtterance(choice);
            synth.speak(frase);


            isSpeaking = true


            button_listen_stop.classList.remove("hidden")
            loading.classList.add("hidden")
            chat_answer.classList.remove("hidden")

            chat_answer.innerHTML = choice

            typeWrite()

        })

    }

    button_listen.classList.remove("text-red-500")
    button_listen.classList.remove("animate-pulse")

    isListening = false

}

recognition.addEventListener("end", (e) => {
	endListen();
});


