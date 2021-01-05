import { useState } from 'react';

const ZoomLens = ({
  lensHeight,
  lensWidth,
  zoomMultiplier,
  intervalId,
  setIntervalId,
  images,
  setImages,
}) => {
  const [mouseDown, setMouseDown] = useState(false);

  const saveImages = (sx, sy, sWidth, sHeight) => {
    if (mouseDown) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const video = document.getElementById('video');
      const lens = document.getElementById('zoom-lens');

      // Create canvas larger than lens
      ctx.canvas.width = lens.offsetWidth * zoomMultiplier;
      ctx.canvas.height = lens.offsetHeight * zoomMultiplier;

      ctx.drawImage(
        video,
        sx - lensHeight / 2,
        sy - lensHeight / 2,
        video.offsetWidth,
        video.offsetHeight,
        0,
        0,
        video.offsetWidth * zoomMultiplier,
        video.offsetHeight * zoomMultiplier
      );

      console.log('saving images');
      // remember to cap the rate of images saved
      const newImage = canvas.toDataURL('image/png');
      // .replace("image/png", "image/octet-stream");
      setImages([...images, newImage]);
    }
  };

  const toggleMouseDown = () => {
    console.log(mouseDown);
    setMouseDown(!mouseDown);
  };

  const getMousePosition = (e) => {
    const video = document.getElementById('video');
    const { left, top, width, height } = video.getBoundingClientRect();

    let x = 0;
    let y = 0;
    const { pageX, pageY } = e;

    x = pageX - left - window.pageXOffset;
    y = pageY - top - window.pageYOffset;

    if (x > width - lensWidth / 2) {
      x = width - lensWidth / 2;
    }
    if (x < lensWidth / 2) {
      x = lensWidth / 2;
    }
    if (y > height - lensHeight / 2) {
      y = height - lensHeight / 2;
    }
    if (y < lensHeight / 2) {
      y = lensHeight / 2;
    }
    return { x, y };
  };

  return (
    <div
      id='zoom-lens'
      onMouseDown={toggleMouseDown}
      onMouseUp={toggleMouseDown}
      onMouseMove={(e) => {
        const { x, y } = getMousePosition(e);
        // console.log(x, y);
        saveImages(x, y);
      }}
      onMouseEnter={() => clearInterval(intervalId)}
    ></div>
  );
};

export default ZoomLens;
