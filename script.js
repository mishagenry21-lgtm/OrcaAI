const API_KEY = "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"

function addMessage(text, type){

let chat = document.getElementById("chat")

let div = document.createElement("div")

div.className = "message " + type

div.innerText = text

chat.appendChild(div)

chat.scrollTop = chat.scrollHeight

}

async function sendMessage(){

let input = document.getElementById("message")

let text = input.value

if(!text) return

addMessage(text,"user")

input.value=""

addMessage("ИИ думает...","ai")

let response = await fetch("https://openrouter.ai/api/v1/chat/completions",{

method:"POST",

headers:{
"Authorization":"Bearer "+API_KEY,
"Content-Type":"application/json"
},

body:JSON.stringify({

model:"meta-llama/llama-3-8b-instruct",

messages:[
{role:"user",content:text}
]

})

})

let data = await response.json()

document.querySelector(".ai:last-child").innerText =
data.choices[0].message.content

}