import { useState, useEffect } from 'react';

const ZoomLens = ({
  mousePos,
  lensHeight,
  lensWidth,
  zoomMultiplier,
  currentStream,
  // streamDimensions,
  setStreamDimensions,
  intervalId,
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

      const lens = document.getElementById('zoom-lens');
      const cx = canvas.offsetWidth / lens.offsetWidth;
      const cy = canvas.offsetHeight / lens.offsetHeight;

      console.log(zoomMultiplier);

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
  return (
    <div
      id='zoom-lens'
      onMouseDown={toggleMouseDown}
      onMouseUp={toggleMouseDown}
      onMouseMove={saveImages}
      onMouseEnter={() => clearInterval(intervalId)}
    ></div>
  );
};

export default ZoomLens;
