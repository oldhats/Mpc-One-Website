const pad1Btn = document.getElementById("p1");
const pad2Btn = document.getElementById("p2");
const pad3Btn = document.getElementById("p3")
// for web audio api
const audioContext = new AudioContext()


pad1Btn.addEventListener("click", function () {
    playSound("drum")
}
)

pad2Btn.addEventListener("click", function () {
    playSound("hat")
}
)
pad3Btn.addEventListener("click", function () {
    playSound("kick")
}
)

// used another stackoverflow answer
// bless stackoverflow

function playSound(filename, playing)
{    
    var filepath=`/sounds/${filename}.mp3`; //example
    var audio = new Audio();   
    audio.src = filepath;
    audio.controls = true;
    audio.autoplay = true;
    if (playing === true){
        audio.pause()
        audio.currentTime = 0
    } else {
        audio.src = filepath;
        audio.controls = true;
        audio.autoplay = true;
    }
}

