import { useState, useEffect } from 'react';

const Video = ({
  mousePos,
  lensHeight,
  lensWidth,
  currentStream,
  // streamDimensions,
  setStreamDimensions,
}) => {
  const [mouseDown, setMouseDown] = useState(false);
  const drawCanvas = (e, sx, sy, sWidth, sHeight) => {
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');

    const drawLoop = () => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const video = document.getElementById('video');
      const streamDimensions = video.getBoundingClientRect();
      // console.log(streamDimensions.width, streamDimensions.height);
      const lens = document.getElementById('zoom-lens');
      const cx = video.offsetWidth / lens.offsetWidth;
      const cy = video.offsetHeight / lens.offsetHeight;
      // console.log(video.offsetWidth, video.offsetHeight);
      // console.log(lens.offsetWidth, lens.offsetHeight);
      // console.log(canvas.offsetWidth, canvas.offsetHeight);

      // const contentX = remote.getCurrentWindow().getContentSize()[0];
      const { width, height } = currentStream
        ? currentStream.getVideoTracks()[0].getSettings()
        : { width: 0, height: 0 };
      console.log(width, height);
      // const ratio = width / height;

      // const X / (width/height)  = contentY
      // const contentY = contentX / ratio;
      // const [screenX, screenY] = remote.screen.getPrimaryDisplay().size;
      // const screenRatio = screenX / screenY;
      //NEED TO GET SIZE OF ACTUAL STREAM
      ctx.drawImage(
        e.target,
        0,
        0,
        1280,
        442
        // 0,
        // 0,
        // lensWidth * cx,
        // lensHeight * cy
      );
      setTimeout(drawLoop, 1000 / 2); // drawing at 30fps
    };

    drawLoop();
  };

  const saveImages = (e, sx, sy, sWidth, sHeight) => {
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');
    if (mouseDown) {
      console.log('saving images');
      // remember to cap the rate of images saved
    }
    // ctx.drawImage(e.target, 0, 0);
    // ctx.drawImage(e.target, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
  };

  const toggleMouseDown = () => {
    console.log(mouseDown);
    setMouseDown(!mouseDown);
  };

  useEffect(() => {});
  // mousePos[0], mousePos[1]
  return (
    <video
      id='video'
      onPlay={(e) => {
        console.log('playing');
        drawCanvas(e, 200, 200, lensWidth, lensHeight);
      }}
      onMouseDown={toggleMouseDown}
      onMouseUp={toggleMouseDown}
      onMouseMove={saveImages}
      // onMouseMove={(e) => {
      //   saveImages(e, mousePos[0], mousePos[1], lensWidth, lensHeight);
      // }}
    ></video>
  );
};

export default Video;
