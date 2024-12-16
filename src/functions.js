import three from "./main";

function takeScreenshot() {
  three.renderer.render(three.scene, three.camera);
  const dataUrl = three.renderer.domElement.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "screenshot.png";
  link.click();
}

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function startRecording() {
  document.getElementById("startRecordingBtn").style.display = "none";
  document.getElementById("stopRecordingBtn").style.display = "block";
  isRecording = true;
  const canvas = three.renderer.domElement;
  const stream = canvas.captureStream(30); // 30 FPS
  mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  mediaRecorder.start();
}

function stopRecording() {
  document.getElementById("startRecordingBtn").style.display = "block";
  document.getElementById("stopRecordingBtn").style.display = "none";
  isRecording = false;
  mediaRecorder.stop();
}

window.takeScreenshot = takeScreenshot;
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.isRecording = isRecording;
