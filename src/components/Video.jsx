const Video = ({ lensHeight, lensWidth, zoomMultiplier, setIntervalId }) => {
  const drawCanvas = (e, sx, sy, sWidth, sHeight) => {
    const drawLoop = () => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      const lens = document.getElementById('zoom-lens');

      ctx.canvas.width = lens.offsetWidth * zoomMultiplier;
      ctx.canvas.height = lens.offsetHeight * zoomMultiplier;
      ctx.drawImage(e.target, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
    };

    const drawIntervalPlay = setInterval(drawLoop, 1000 / 30); // 30fps
    setIntervalId(drawIntervalPlay);
  };

  return (
    <video
      id='video'
      onPlay={(e) => {
        console.log('playing');
        drawCanvas(
          e,
          0,
          0,
          lensWidth * zoomMultiplier,
          lensHeight * zoomMultiplier
        );
      }}
    ></video>
  );
};

export default Video;
