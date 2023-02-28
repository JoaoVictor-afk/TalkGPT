



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

function micButtonToggle (state) {

    switch (state) {

        case true:

            button_listen.classList.add("text-red-500")
            button_listen.classList.add("animate-pulse")
            button_listen.classList.add("scale-110")
            button_listen.setAttribute("name", "mic-off")

            break;
        
        default:

            button_listen.classList.remove("text-red-500");
            button_listen.classList.remove("animate-pulse");
            button_listen.classList.remove("scale-110")
            button_listen.setAttribute("name", "mic");
            
    }
}

function closeApiWindow() {

    key_insert_window.classList.add("hidden")

}

function openApiWindow() {

    key_insert_window.classList.remove("hidden")

}

function updateButton(e) {


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

    if ((txt_index < tw_answer.length) && (botSpeaking)) {

        chat_answer.innerHTML += tw_answer.charAt(txt_index)
        txt_index++
        setTimeout(typeWrite, 75)

    } else {

        txt_index = 0
        botSpeaking = false
        button_listen_stop.classList.add("hidden")
    
    }
    
}

