let mic;
let mySound;
let amp;
let fft;

// function preload() {
//   // When using sound file, load file in preload() and play/loop the file in setup()
//   mySound = loadSound('tri-ky.mp3')
// }

function setup() {
    createCanvas(400, 400);
    // mySound.loop();
    mic = new p5.AudioIn();
    mic.start();
    mySound = mic;

    amp = new p5.Amplitude();
    fft = new p5.FFT();

    // If using SoundFile, it links automatically, but for AudioIn, we need to make it explicit
    fft.setInput(mic);
}

function draw() {
    background(220);

    let level = mySound.getLevel();
    let radius = map(level, 0, 1, 0, width / 10);
    fill(255, 0, 0);
    circle(width / 2, height / 2, radius);

    let waves = fft.waveform();
    let spectrum = fft.analyze();

    for (let i = 0; i < waves.length; i++) {
        let x = map(i, 0, waves.length, 0, width);
        let y = map(waves[i], -1, 1, height, 0);
        circle(x, y, radius);
    }

    // TODO visualize spectrum too
}
