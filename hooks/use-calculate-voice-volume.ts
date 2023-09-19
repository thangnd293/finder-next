import { useEffect } from "react";

export const useCalculateVoiceVolume = (
  stream: MediaStream | null,
  id: string,
) => {
  useEffect(() => {
    if (!stream) return;
    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const biquadFilter = audioCtx.createBiquadFilter();
    const gainNode = audioCtx.createGain();
    const distortion = audioCtx.createWaveShaper();

    let drawVisual: number | undefined;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    const canvas = document.getElementById(`canvas-${id}`) as HTMLCanvasElement;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    try {
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(audioCtx.destination);

      distortion.oversample = "4x";
      biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0);

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      analyser.fftSize = 2048;
      const bufferLength = analyser.fftSize;

      const dataArray = new Uint8Array(bufferLength);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      const draw = function () {
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "transparent";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 1.5;
        canvasCtx.strokeStyle = "green";

        canvasCtx.beginPath();

        const sliceWidth = (WIDTH * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      };

      draw();
    } catch (err) {
      console.log(err);
    }

    return () => {
      if (drawVisual !== undefined) {
        cancelAnimationFrame(drawVisual);
      }
    };
  }, [stream, id]);
};
