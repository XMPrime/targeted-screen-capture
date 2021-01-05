import { useState, useEffect } from 'react';
import './App.css';
import './Normalize.css';
import Video from './components/Video';
import RecordBtn from './components/RecordBtn';
import VideoSelectBtn from './components/VideoSelectBtn';
import ZoomLens from './components/ZoomLens';
import Canvas from './components/Canvas';

// const { screen } = window.require('electron');
const { remote } = window.require('electron');
const { createWriteStream } = remote.require('fs');
const JSZip = remote.require('jszip');
// const robot = remote.require('robotjs');

function App() {
  const [mediaRecorder, setMediaRecorder] = useState();
  const [streamDimensions, setStreamDimensions] = useState();
  const [lensHeight, setLensHeight] = useState(100);
  const [lensWidth, setLensWidth] = useState(100);
  const [zoomMultiplier, setZoomMultiplier] = useState(1.5);
  const [intervalId, setIntervalId] = useState();
  const [images, setImages] = useState([]);

  const moveLens = (e) => {
    e.preventDefault();
    let lens = document.getElementById('zoom-lens');
    const video = document.getElementById('video');
    const { left, top, width, height } = video.getBoundingClientRect();

    const getMousePosition = (e) => {
      let x = 0;
      let y = 0;
      const { pageX, pageY } = e;

      x = pageX - left;
      y = pageY - top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x, y };
    };
    let { x, y } = getMousePosition(e);

    x = x - lensWidth / 2;
    y = y - lensHeight / 2;

    if (x > width - lensWidth) {
      x = width - lensWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > height - lensHeight) {
      y = height - lensHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
  };

  const changeLensDimensions = (e) => {
    const { id, value } = e.target;
    const lens = document.getElementById('zoom-lens');
    const canvas = document.getElementById('canvas');

    if (id === 'lens-height') {
      setLensHeight(value);
      lens.style.height = value + 'px';
      canvas.style.height = value * zoomMultiplier + 'px';
    }
    if (id === 'lens-width') {
      setLensWidth(value);
      lens.style.width = value + 'px';
      canvas.style.width = value * zoomMultiplier + 'px';
    }
  };

  const changeZoom = (e) => {
    const multiplier = e.target.value;
    const canvas = document.getElementById('canvas');
    setZoomMultiplier(multiplier);
    canvas.style.height = lensHeight * multiplier + 'px';
    canvas.style.width = lensWidth * multiplier + 'px';
  };

  const saveImages = async () => {
    // bless! https://stackoverflow.com/questions/45448726/jszip-temporary-file-location
    var zip = new JSZip();
    images.forEach((image, i) => {
      const dataURL = image.replace('data:image/png;base64,', '');
      zip.file(`IMG_${i + 1}.png`, dataURL, { base64: true });
    });

    const { filePath } = await remote.dialog.showSaveDialog({
      buttonLabel: 'Save images',
      defaultPath: `images-${Date.now()}.zip`,
      extensions: ['zip'],
    });

    if (filePath) {
      zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(createWriteStream(filePath))
        .on('finish', function () {
          // JSZip generates a readable stream with a "end" event,
          // but is piped here in a writable stream which emits a "finish" event.
          console.log('zip written.');
        });
    }
  };

  useEffect(() => {
    const lens = document.getElementById('zoom-lens');
    const canvas = document.getElementById('canvas');
    lens.style.height = lensWidth + 'px';
    lens.style.width = lensWidth + 'px';
    canvas.style.height = lensWidth * zoomMultiplier + 'px';
    canvas.style.width = lensWidth * zoomMultiplier + 'px';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <h1>⚡ Targeted Screen Capture ⚡</h1>
      <br />
      <div className='text-inputs'>
        <div>
          <label>Crop Height: </label>
          <input
            id='lens-height'
            type='number'
            value={lensHeight}
            onChange={changeLensDimensions}
          ></input>
        </div>
        <div>
          <label>Crop Width: </label>
          <input
            id='lens-width'
            type='number'
            value={lensWidth}
            onChange={changeLensDimensions}
          ></input>
        </div>
        <div>
          <label>Zoom Multiplier: </label>
          <input
            id='lens-width'
            type='number'
            value={zoomMultiplier}
            onChange={changeZoom}
          ></input>
        </div>
      </div>

      <div className='buttons'>
        <VideoSelectBtn
          mediaRecorder={mediaRecorder}
          setMediaRecorder={setMediaRecorder}
          setStreamDimensions={setStreamDimensions}
        />
        <RecordBtn mediaRecorder={mediaRecorder} />
        <button
          id='save-images-btn'
          className='button is-primary'
          onClick={saveImages}
        >{`Save ${images.length} Images`}</button>
      </div>

      <label>{`Preview (${zoomMultiplier}x)`}</label>
      <Canvas />

      <div className='zoom-container' onMouseMove={moveLens}>
        <Video
          lensHeight={lensHeight}
          lensWidth={lensWidth}
          zoomMultiplier={zoomMultiplier}
          setIntervalId={setIntervalId}
        />

        <ZoomLens
          lensHeight={lensHeight}
          lensWidth={lensWidth}
          zoomMultiplier={zoomMultiplier}
          streamDimensions={streamDimensions}
          intervalId={intervalId}
          setIntervalId={setIntervalId}
          images={images}
          setImages={setImages}
        />
      </div>

      <hr />
    </div>
  );
}

export default App;
