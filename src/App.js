import { useState, useEffect } from 'react';
import './App.css';
import Video from './components/Video';
import RecordBtn from './components/RecordBtn';
import VideoSelectBtn from './components/VideoSelectBtn';

function App() {
  const [mediaRecorder, setMediaRecorder] = useState();
  const [recordedChunks, setRecordedChunks] = useState([]);

  return (
    <div className='App'>
      <h1>⚡ Electron Screen Recorder</h1>

      <Video />

      <VideoSelectBtn
        mediaRecorder={mediaRecorder}
        setMediaRecorder={setMediaRecorder}
      />
      <hr />
      <RecordBtn mediaRecorder={mediaRecorder} />
    </div>
  );
}

export default App;
