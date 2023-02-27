
const browser_window = document.getElementById("browser-not-supported")

const button_listen = document.getElementById("mic_button")
const button_listen_stop = document.getElementById("mic_button_stop")

const key_insert_window = document.getElementById("api-key-popup")

const mic_capture = document.getElementById("mic_capture")
const chat_answer = document.querySelector('.chat_answer')

const loading = document.getElementById('loading_animation')

const validation_button = document.getElementById("api-key-button")
const send_button = document.getElementById("api-key-send-button")
const key_input = document.getElementById("api-key-input")
const checkbox = document.getElementById("save-key-check")


var supported = false


function micButtonEnable(state) {

    switch (state) {

        case true:

            button_listen.classList.remove("opacity-50")
            button_listen.classList.remove("scale-75")
            button_listen.classList.add("hover:scale-110")
            button_listen.removeAttribute("style")

            break;
        
        default:

            button_listen.classList.add("opacity-50")
            button_listen.classList.add("scale-75")
            button_listen.classList.remove("hover:scale-110")
            button_listen.setAttribute("style", "pointer-events: none")



    }

}

function toggleBrowserWindow (state){
    switch (state) {

        case true:

            browser_window.classList.remove("hidden")

            break;
        
        default:

            browser_window.classList.add("hidden")
            
    }
}


if ("webkitSpeechRecognition" in window) {

	supported = true

    document.write('<script src="./src/js/validateKey.js"></script>')
    document.write('<script src="./src/js/voice.js"></script>')

  
} else {

	console.log("Speech Recognition Not Available")
	micButtonEnable(false)

	toggleBrowserWindow(true)

}