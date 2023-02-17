window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const titulo = document.querySelector('.fala');

const button = document.getElementById("falar")
const botao_parar = document.getElementById("parar_falar")

const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

const words = document.querySelector(".words");
words.appendChild(p);

var isSpeaking = false;



botao_parar.addEventListener("click", e => {

    if (synth.speaking) {

        synth.cancel()
        botao_parar.classList.add("hidden")

    }

})

recognition.addEventListener("result", (e) => {
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	document.getElementById("p").innerHTML = transcript;
});

button.addEventListener("click", e => {

    if (!synth.speaking && !isSpeaking) {

        isSpeaking = true

        button.classList.add("text-red-500")
        button.classList.add("animate-pulse")
        
        recognition.start();

    } else {

        recognition.stop()

    }

})


function end_listen() {

    setTimeout( function() {
        
        const texto = document.getElementById("p").innerHTML

        let fetchData = {

            method : "POST",
            body : JSON.stringify({
                ms : texto,
                js : true
            }),
            headers : {
                "Content-Type" : "application/json"
            }

        }
        
        fetch('/sendvoice', fetchData).then(res => res.json())
        .then(data => {

            console.log(data)
            const choice = JSON.parse(data).choices[0].text
            console.log(choice)
            
            const frase = new SpeechSynthesisUtterance(choice);

            frase.onend = () => {

                botao_parar.classList.add("hidden")

            }

            synth.speak(frase);

            isSpeaking = false;

            botao_parar.classList.remove("hidden")

            titulo.innerHTML = choice

            typeWrite(titulo)

        })

        

        button.classList.remove("text-red-500")
        button.classList.remove("animate-pulse")


        


    }, 500);

}



recognition.addEventListener("end", (e) => {
	end_listen();
});

function typeWrite(e) {
	const textoArray = e.innerHTML.split("");
	e.innerHTML = " ";
	textoArray.forEach(function (letra, i) {
		setTimeout(function () {
			e.innerHTML += letra;
		}, 75 * i);
	});
}
