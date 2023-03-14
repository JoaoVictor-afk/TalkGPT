const tutorial = document.getElementById("tutorial")

const browser_window = document.getElementById("browser-not-supported")
const safari_window = document.getElementById("browser-safari")

const button_listen = document.getElementById("mic_button")
const mic_capture = document.getElementById("mic_capture")

const loading = document.getElementById('loading_animation')

const key_insert_window = document.getElementById("api-key-popup")
const validation_button = document.getElementById("api-key-button")
const send_button = document.getElementById("api-key-send-button")
const key_input = document.getElementById("api-key-input")
const checkbox = document.getElementById("save-key-check")

var able_to_run = false

function toggleSafariWindow (state){
    if (state) {

        safari_window.classList.remove("hidden")

    }else {
        
        safari_window.classList.add("hidden")
            
    }
}


function micButtonEnable(state) {

    if (state) {

            button_listen.classList.remove("opacity-50")
            button_listen.classList.remove("scale-75")
            button_listen.classList.remove("pointer-events-none")
            button_listen.classList.add("hover:scale-110")

    } else { 

            button_listen.classList.add("opacity-50")
            button_listen.classList.add("scale-75")
            button_listen.classList.add("pointer-events-none")
            button_listen.classList.remove("hover:scale-110")

    }

}


function toggleBrowserWindow (state){

    if (state) {

        browser_window.classList.remove("hidden")

    } else {
        
        browser_window.classList.add("hidden")
            
    }

}


if ("webkitSpeechRecognition" in window) {
    
    var result = bowser.getParser(window.navigator.userAgent);
    
    if (result["parsedResult"]["browser"]["name"] == "Safari") {
        
        toggleSafariWindow(true)

    } 
    
    able_to_run = true

    navigator.mediaDevices.getUserMedia({ audio: true });
    
  
} else {

	console.log("Speech Recognition Not Available")

	micButtonEnable(false)
	toggleBrowserWindow(true)

}