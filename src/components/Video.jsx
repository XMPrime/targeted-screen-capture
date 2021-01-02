import { useState } from 'react';

const Video = () => {
  const [recording, setRecording] = useState(false);

  const stopRecord = () => {
    // mediaRecorder.start();
    // recordBtn.ClassList.add('is-danger');
  };
  return <video id='video'></video>;
};

export default Video;
