

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const button = document.getElementById("falar")

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

        button.classList.add("text-red-500")
        button.classList.add("animate-pulse")
        
        isSpeaking = true;
        recognition.start();

    }

})


function end_listen() {

    isSpeaking = false;

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
            synth.speak(frase);


        })

        

        button.classList.remove("text-red-500")
        button.classList.remove("animate-pulse")


        


    }, 500);

}



recognition.addEventListener('speechend', e => {

    end_listen()

});

