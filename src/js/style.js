



button_listen.addEventListener("click", e => {

    if (!isSpeaking && !isListening) {

        if (synth.speaking) {
            synth.cancel()
        }

        isListening = true

        chat_answer.innerHTML = ""
        mic_capture.innerHTML = ""

        button_listen.setAttribute("name", "mic-off")
        
        chat_answer.classList.add("hidden")

        button_listen.classList.add("text-red-500")
        button_listen.classList.add("animate-pulse")
        
        recognition.start();

    } else {

        button_listen.setAttribute("name", "mic")
        
        recognition.stop()

    }

})


button_listen_stop.addEventListener("click", e => {

    if (isSpeaking) {

        synth.cancel()
        button_listen_stop.classList.add("hidden")
        isSpeaking = false

    }

})



function closeApiWindow() {

    key_insert_window.classList.add("hidden")

}

function openApiWindow() {

    key_insert_window.classList.remove("hidden")

}

function updateButton(e) {

    console.log(e)

    if (e.length > 0) {
        send_button.classList.add("bg-black")
        send_button.classList.add("hover:scale-105")

        send_button.disabled = false
        
        

    } else {
        send_button.classList.remove("bg-black")
        send_button.classList.remove("hover:scale-105")
        send_button.disabled = true
        
        


    }
}


var tw_answer = ""
var txt_index = 0

function typeWrite() {

    if (txt_index == 0) {
        tw_answer = chat_answer.innerHTML
        chat_answer.innerHTML = ""
    }

    if ((txt_index < tw_answer.length) && (isSpeaking)) {

        chat_answer.innerHTML += tw_answer.charAt(txt_index)
        txt_index++
        setTimeout(typeWrite, 75)

    } else {

        txt_index = 0
        isSpeaking = false
        button_listen_stop.classList.add("hidden")
    
    }
    
}

