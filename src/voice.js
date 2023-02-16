

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const button = document.getElementById("falar")
const mic = document.getElementById("mic")

const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

const words = document.querySelector('.words');
words.appendChild(p);

var isSpeaking = false;

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    document.getElementById("p").innerHTML = transcript;
});

button.addEventListener("click", e => {

    if (!isSpeaking) {

        console.log("Ouvindo")

        mic.classList.add("text-red-500")
        
        
        isSpeaking = true;
        recognition.start();

    }

})

const delayInMilliseconds = 1000; //1 second

recognition.addEventListener('speechend', e => {

    isSpeaking = false;

    

    setTimeout(function() {
        
        const texto = document.getElementById("p").innerHTML
        const frase = new SpeechSynthesisUtterance(texto);

        mic.classList.remove("text-red-500")

        synth.speak(frase);

        
    }, delayInMilliseconds);

});
