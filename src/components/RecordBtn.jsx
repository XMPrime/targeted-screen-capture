import { useState } from 'react';

const RecordBtn = ({ mediaRecorder }) => {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    if (recording) {
      mediaRecorder.stop();
    } else {
      mediaRecorder.start();
    }

    console.log(mediaRecorder);
    setRecording(!recording);
  };
  return (
    <button
      id='recordBtn'
      className={`button ${recording ? 'is-danger' : 'is-primary'}`}
      onClick={toggleRecording}
      // disabled
    >
      {recording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
};

export default RecordBtn;
