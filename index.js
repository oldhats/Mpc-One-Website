// for web audio api
const ctx = new AudioContext();
const analyser = ctx.createAnalyser();

const soundFiles = {
  p1: "./sounds/Crash.wav",
  p2: "./sounds/Kick 01.wav",
  p3: "./sounds/Kick 02.wav",
  p4: "./sounds/Kick 03.wav",
  p5: "./sounds/Kick 04.mp3",
  p6: "./sounds/Poppin FX_06.wav",
  p7: "./sounds/Poppin FX_07.wav",
  p8: "./sounds/Sax.wav",
  p9: "./sounds/Snare 01.wav",
  p10: "./sounds/Snare 02.wav",
  p11: "./sounds/Snare 04.wav",
  p12: "./sounds/Snare 05.wav",
  p13: "./sounds/drum.mp3",
  p14: "./sounds/hat.mp3",
  p15: "./sounds/hum.wav",
};

const sounds = new Map();

async function loadSound(name, url) {
  const response = await fetch(encodeURI(url));
  const arrayBuffer = await response.arrayBuffer();
  const decodedAudio = await ctx.decodeAudioData(arrayBuffer);
  sounds.set(name, decodedAudio);
}

Promise.all(
  Object.entries(soundFiles).map(([name, url]) => loadSound(name, url)),
);

function playSound(name) {
  const buffer = sounds.get(name);
  if (!buffer) return; // hasnt loaded or bad name
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(analyser);
  source.connect(ctx.destination);
  source.start(ctx.currentTime);
}

function flashPad(btn) {
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 150);
}

document.querySelectorAll(".pad-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    playSound(btn.id);
    flashPad(btn);
  });
});

// This is for the visulizer
const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let canvasCtx = canvas.getContext("2d");

let readings = new Uint8Array(analyser.frequencyBinCount);

function draw() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(readings);
  for (let i = 0; i < readings.length; i++) {
    canvasCtx.fillRect(i, canvas.height - readings[i], 4, readings[i]);
  }
  requestAnimationFrame(draw);
}
draw();
