let btnPlay = document.getElementById("play");
let btnPause = document.getElementById("pause");
let canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audio;

btnPlay.onclick = () => {
    audio = new Audio();

    audio.src = URL.createObjectURL(document.getElementById("my-audio-file").files[0]);
    console.log(document.getElementById("my-audio-file").files[0]);

    // let audio = new Audio("./Gia-Dinh-Nho-Hanh-Phuc-To-Nhat-Tinh-Anh-Khanh-Ngoc-Be-Trieu-Vy.mp3");
    let audioCtx = new window.AudioContext();
    let audioSource = audioCtx.createMediaElementSource(audio);
    let analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const fftDataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x;

    function animate() {
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(fftDataArray);
        for (let i = 0; i < bufferLength; i++) {
            barHeight = fftDataArray[i] * 0.8;
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }
    audio.play();
    animate();
}

btnPause.onclick = () => {
    audio.pause();
}

