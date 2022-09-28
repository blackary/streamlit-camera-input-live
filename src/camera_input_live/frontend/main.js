// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
  Streamlit.setComponentValue(value)
}



/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    // You most likely want to get the data passed in like this
    const {height, width, debounce, showControls, startLabel, stopLabel} = event.detail.args

    if (showControls) {
      Streamlit.setFrameHeight(45)
    }

    if (isNaN(height)) {
      height = width / (4/3);
    }

    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let stopButton = document.getElementById('stopButton');
    let switchButton = document.getElementById('switchButton');

    let stopped = false;
    let facingMode = 'user';

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    function takepicture() {
      if (stopped) {
        return;
      }
      let context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      sendValue(data);
    }


    function stopVideo() {
      video.pause();
      video.srcObject.getTracks()[0].stop();
      stopped = true;
    }

    function startVideo() {
      navigator.mediaDevices.getUserMedia({ video: { height, width, facingMode } })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
        });
    }

    function toggleVideo() {
      if (stopped) {
        startVideo();
        stopped = false;
      } else {
        stopVideo();
        stopped = true;
      }
      // Toggle the button text
      stopButton.textContent = stopped ? startLabel : stopLabel;
    }

    if (navigator.mediaDevices.getUserMedia) {
      startVideo();
    }

    stopButton.addEventListener('click', toggleVideo);
    stopButton.textContent = stopped ? startLabel : stopLabel;

    function toggleSource() {
      if (facingMode == 'user') {
        facingMode = 'environment';
      } else {
        facingMode = 'user';
      }
      stopVideo();
      startVideo();
    }

    switchButton.addEventListener('click', toggleSource);

    takepicture();
    setInterval(takepicture, debounce);
    window.rendered = true
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Don't actually need to display anything, so set the height to 0
Streamlit.setFrameHeight(0)
