import { useState, useEffect } from 'react';
const { remote } = window.require('electron');

const Video = ({
  // mousePos,
  lensHeight,
  lensWidth,
  zoomMultiplier,
  currentStream,
  // streamDimensions,
  setStreamDimensions,
  setIntervalId,
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
      // const { x, y } = remote.screen.getCursorScreenPoint();
      // console.log(x, y);
      // const { x, y } = getMousePosition();

      const lens = document.getElementById('zoom-lens');
      const cx = canvas.offsetWidth / lens.offsetWidth;
      const cy = canvas.offsetHeight / lens.offsetHeight;

      // Create canvas at 1.5x larger than lens
      ctx.canvas.width = lens.offsetWidth * zoomMultiplier;
      ctx.canvas.height = lens.offsetHeight * zoomMultiplier;
      // ctx.canvas.width = video.offsetWidth;
      // ctx.canvas.height = video.offsetHeight;
      ctx.drawImage(
        e.target,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        sWidth,
        sHeight
        // video.offsetWidth * cx,
        // video.offsetHeight * cy
      );

      // setTimeout(drawLoop, 1000 / 2); // drawing at 30fps
    };

    // drawLoop();
    const drawIntervalPlay = setInterval(drawLoop, 1000 / 10);
    setIntervalId(drawIntervalPlay);
  };

  const getMousePosition = (e) => {
    let lens = document.getElementById('zoom-lens');
    const video = document.getElementById('video');
    const { left, top, width, height } = video.getBoundingClientRect();
    let x = 0;
    let y = 0;
    const { pageX, pageY } = e;

    x = pageX - left;
    y = pageY - top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    // x = x - lensWidth / 2;
    // y = y - lensHeight / 2;

    // if (x > width - lensWidth) {
    //   x = width - lensWidth;
    // }
    // if (x < 0) {
    //   x = 0;
    // }
    // if (y > height - lensHeight) {
    //   y = height - lensHeight;
    // }
    // if (y < 0) {
    //   y = 0;
    // }
    return { x, y };
  };

  useEffect(() => {});
  // mousePos[0], mousePos[1]
  return (
    <video
      id='video'
      onPlay={(e) => {
        console.log('playing');
        drawCanvas(
          e,
          10,
          10,
          lensWidth * zoomMultiplier,
          lensHeight * zoomMultiplier
        );
      }}
      // onMouseMove={(e) => {
      //   saveImages(e, mousePos[0], mousePos[1], lensWidth, lensHeight);
      // }}
    ></video>
  );
};

export default Video;
