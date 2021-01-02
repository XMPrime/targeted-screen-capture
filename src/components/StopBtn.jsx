import { useState } from 'react';

const StopBtn = () => {
  const stopRecord = () => {
    // mediaRecorder.start();
    // startBtn.ClassList.add('is-danger');
    // const startBtn = document.getElementById('startBtn');
    // startBtn.classList.remove('is-danger');
    // startBtn.innerText = 'Start';
  };
  return (
    <button id='stopBtn' className='button is-warning' onClick={stopRecord}>
      Stop
    </button>
  );
};

export default StopBtn;
