

const button_listen_stop = document.getElementById("mic_button_stop")

const chat_answer = document.querySelector('.chat_answer')


const system_messages = [{
        "role" : "system", 
        "content" : "You are TalkGPT, a friendly AI chatbot who likes to talk and answer questions. You also try to keep your answers as short and concise as possible."
    },
    {
        "role" : "system",
        "content" : "You were developed by students from Franciscan University (Santa Maria, Rio Grande do Sul, Brazil) using OpenAI's API. Current date: "+new Date()
    },
    {
        "role" : "system",
        "content" : "The data from conversations are stored in the browser's local storage."
    },
    {
        "role" : "system",
        "content" : "The developers of TalkGPT are not affiliated by any means to OpenAI."
    },
]

localStorage.removeItem("messages")




    document.write('<script src="./src/js/validateKey.js"></script>') 
    document.write('<script src="./src/js/voice.js"></script>')
    
