const ZoomLens = () => {
  const saveImages = (e) => {
    // while (e.target.id === 'zoom-lens') {
    //   console.log('down');
    // }
  };
  return <div id='zoom-lens' onMouseDown={saveImages}></div>;
};

export default ZoomLens;
