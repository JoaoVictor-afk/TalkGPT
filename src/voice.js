

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const button = document.getElementById("falar")

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

        button.classList.add("bg-red-500")
        
        isSpeaking = true;
        recognition.start();

    }

})

recognition.addEventListener('speechend', e => {

    isSpeaking = false;
    button.classList.remove("bg-red-500")

});

recognition.addEventListener('end', e => {
    
    const synth = window.speechSynthesis;
    const texto = document.getElementById("p").innerHTML
    const frase = new SpeechSynthesisUtterance(texto);

    synth.speak(frase);

})
