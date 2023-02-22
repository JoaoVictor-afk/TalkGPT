

const validation_button = document.getElementById("api-key-button")
const send_button = document.getElementById("api-key-send-button")
const key_input = document.getElementById("api-key-input")
const checkbox = document.getElementById("save-key-check")

var api_key = localStorage.getItem("talkGPTapiKey")


if (localStorage.hasOwnProperty("checkbox")) {
    switch (localStorage.getItem("checkbox")) {
        case "true":
            checkbox.checked = true
            break
        case "false":
            checkbox.checked = false
            break
        default:
            checkbox.checked = true
    }
    
}



send_key_to_server(api_key)


function validateKey() {

    const key = key_input.value

    closeApiWindow()

    key_input.value = ""

    send_key_to_server(key)

}


function send_key_to_server(key) {

    loading.classList.remove('hidden')

    fetch('/getAPIkey', {
        method: 'POST',
        body: JSON.stringify({ key }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {

            loading.classList.add('hidden')


            if (data) {
                validation_button.classList.add("bg-green-400")

                button_listen.classList.remove("opacity-50")
                button_listen.classList.remove("scale-75")
                button_listen.classList.add("hover:scale-110")
                button_listen.removeAttribute("style")

                if (!api_key && checkbox.checked) {
                
                    localStorage.setItem("talkGPTapiKey", key)
                
                }
                
            } else {
                validation_button.classList.remove("bg-green-400")

                button_listen.classList.add("opacity-50")
                button_listen.classList.add("scale-75")
                button_listen.classList.remove("hover:scale-110")
                button_listen.setAttribute("style", "pointer-events: none")


            }

        })
        //.catch(error => console.error(error));
    
}

function remember(e) {

    localStorage.setItem("checkbox", e.checked)

}