// const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const footer = document.getElementById("footer");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    sendCode(res);
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });
    footer.hidden = false;
    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  video.videoHeight = window.innerHeight;
  video.videoWidth = window.innerWidth;
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

const stateLinks = document.getElementsByClassName("state");

var changeColor = function (event) {
  const selected = document.getElementsByClassName("selected");
  for (var i = 0; i < selected.length; i++) {
    console.log(selected[i]);
    selected[i].classList.remove("selected");
  }
  event.target.classList.add("selected");
};

for (var i = 0; i < stateLinks.length; i++) {
  stateLinks[i].addEventListener("click", changeColor, false);
}
