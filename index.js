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

const gradient = canvasCtx.createLinearGradient(0, 0, 200, 0);

function drawBars() {
  canvasCtx.fillStyle = "red";
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(readings);
  for (let i = 0; i < readings.length; i++) {
    // it was overflowing from the canvas so have to normalize the y and height values
    canvasCtx.fillRect(
      i,
      canvas.height - (readings[i] / 255) * canvas.height,
      2,
      (readings[i] / 255) * canvas.height,
    );
  }
}

function dots() {
  let x = 0;

  // canvasCtx.fillStyle = "red";
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / bufferLength;

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);

  let barHeight;
  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * canvas.height;
    const red = (i * barHeight) / 10;
    const green = i * 4;
    const blue = barHeight / 4 - 12;
    canvasCtx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

const visualsFuncs = [drawBars, dots];
let currentVisual = 0;

function renderLoop() {
  visualsFuncs[currentVisual]();
  requestAnimationFrame(renderLoop);
}
renderLoop();

const changeVisionBtn = document.querySelector(".change-vis-btn");
changeVisionBtn.addEventListener("click", () => flashPad(changeVisionBtn));
changeVisionBtn.addEventListener("click", function () {
  currentVisual = (currentVisual + 1) % visualsFuncs.length;
});
