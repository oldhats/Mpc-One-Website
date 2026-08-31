const pad1Btn = document.getElementById("p1");
const pad2Btn = document.getElementById("p2");
// const audio = document.createElement("audio");
// audio.src = "./sounds/hat.mp3";
// creates an array of audios and assigns the src to each of them
const srcArr = ['sounds/drum.MP3', 'sounds/hat.MP3'];
const audios = new Array(srcArr.length).fill(new Audio());
audios.forEach((audio, index) => audio.src = srcArr[index]);
console.log(srcArr[0])
console.log(srcArr[1])



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

const playSound = (fileName) => {
  const audio = new Audio();
  audio.src = `sounds/${fileName}.mp3`;
  audio.play();
};

