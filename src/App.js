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
const robot = remote.require('robotjs');

function App() {
  const [mediaRecorder, setMediaRecorder] = useState();
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [currentStream, setCurrentStream] = useState();
  const [streamDimensions, setStreamDimensions] = useState();
  const [mousePos, setMousePos] = useState([0, 0]);
  const [lensHeight, setLensHeight] = useState(100);
  const [lensWidth, setLensWidth] = useState(100);
  const [zoomMultiplier, setZoomMultiplier] = useState(1.5);
  const [intervalId, setIntervalId] = useState();

  const moveLens = (e) => {
    e.preventDefault();
    let lens = document.getElementById('zoom-lens');
    const video = document.getElementById('video');
    const { left, top, width, height } = video.getBoundingClientRect();
    // const zoomedImg = document.getElementById('zoomed-image');

    // const cx = zoomedImg.offsetWidth / lens.offsetWidth;
    // const cy = zoomedImg.offsetHeight / lens.offsetHeight;

    // zoomedImg.style.backgroundSize = `${video.width * cx}px ${
    //   video.height * cy
    // }px`;

    const getMousePosition = (e) => {
      let x = 0;
      let y = 0;
      const { pageX, pageY } = e;
      // console.log(e);

      x = pageX - left;
      y = pageY - top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      setMousePos([x, y]);
      return { x, y };
    };
    let { x, y } = getMousePosition(e);
    // const contentX = remote.getCurrentWindow().getContentSize()[0];
    // const { width, height } = currentStream
    //   ? currentStream.getVideoTracks()[0].getSettings()
    //   : { width: 0, height: 0 };
    // const ratio = width / height;

    // const X / (width/height)  = contentY
    // const contentY = contentX / ratio;
    // const [screenX, screenY] = remote.screen.getPrimaryDisplay().size;
    // const screenRatio = screenX / screenY;

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

    /* Display what the lens "sees": */
    // zoomedImg.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
  };

  // const getVideoSources = async () => {
  //   const inputSources = await desktopCapturer.getSources({
  //     types: ['window', 'screen'],
  //   });

  //   const videoOptionsMenu = remote.Menu.buildFromTemplate(
  //     inputSources.map((source) => {
  //       return {
  //         label: source.name,
  //         click: () => selectSource(source),
  //       };
  //     })
  //   );
  //   videoOptionsMenu.popup();
  // };

  const changeLensDimensions = (e) => {
    const { id, value } = e.target;
    const lens = document.getElementById('zoom-lens');
    const canvas = document.getElementById('canvas');
    // const min = 25;
    // const max = 500;

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

  useEffect(() => {
    const lens = document.getElementById('zoom-lens');
    const canvas = document.getElementById('canvas');
    lens.style.height = lensWidth + 'px';
    lens.style.width = lensWidth + 'px';
    canvas.style.height = lensWidth * zoomMultiplier + 'px';
    canvas.style.width = lensWidth * zoomMultiplier + 'px';
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
        {/* <label>Crop Width: </label>
        <input type='text'></input> */}
      </div>

      <VideoSelectBtn
        mediaRecorder={mediaRecorder}
        setMediaRecorder={setMediaRecorder}
        setCurrentStream={setCurrentStream}
        setStreamDimensions={setStreamDimensions}
      />

      <div className='zoom-container' onMouseMove={moveLens}>
        <Video
          mousePos={mousePos}
          lensHeight={lensHeight}
          lensWidth={lensWidth}
          zoomMultiplier={zoomMultiplier}
          currentStream={currentStream}
          setStreamDimensions={setStreamDimensions}
          streamDimensions={streamDimensions}
          setIntervalId={setIntervalId}
        />

        <ZoomLens
          mousePos={mousePos}
          lensHeight={lensHeight}
          lensWidth={lensWidth}
          zoomMultiplier={zoomMultiplier}
          currentStream={currentStream}
          setStreamDimensions={setStreamDimensions}
          streamDimensions={streamDimensions}
          intervalId={intervalId}
          setIntervalId={setIntervalId}
        />
        {/* <div id='zoomed-image'></div> */}
      </div>
      <hr />
      <label>{`Preview (${zoomMultiplier}x)`}</label>
      <Canvas />

      <hr />
      <RecordBtn mediaRecorder={mediaRecorder} />
    </div>
  );
}

export default App;
