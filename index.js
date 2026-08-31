const pad1Btn = document.getElementById("p1");
const pad2Btn = document.getElementById("p2");
const audio = document.createElement("audio");
audio.src = "./sounds/hat.mp3";



pad1Btn.addEventListener("click", playMusic)

function playMusic(){
    audio.play();
}

