const pad1Btn = document.getElementById("p1");
const pad2Btn = document.getElementById("p2");
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

// Source - https://stackoverflow.com/a/76196278
// Posted by Roko C. Buljan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-31, License - CC BY-SA 4.0
// bless stackoverflow

function playSound(filename)
{    
    var filepath=`/sounds/${filename}.mp3`; //example
    var audio = new Audio();   
    audio.src = filepath;
    audio.controls = true;
    audio.autoplay = true;

}

