import { useState } from 'react';
// const electron = window.require('electron');
// const { desktopCapturer, remote } = require('electron');

const { desktopCapturer, remote } = window.require('electron');

const { writeFile } = remote.require('fs');
const recordedChunks = [];

const VideoSelectBtn = ({
  mediaRecorder,
  setMediaRecorder,
  setCurrentStream,
  setStreamDimensions,
}) => {
  const [sourceName, setSourceName] = useState();
  // const [recordedChunks, setRecordedChunks] = useState([]);

  const getVideoSources = async () => {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen'],
    });

    const videoOptionsMenu = remote.Menu.buildFromTemplate(
      inputSources.map((source) => {
        return {
          label: source.name,
          click: () => selectSource(source),
        };
      })
    );
    videoOptionsMenu.popup();
  };

  const selectSource = async (source) => {
    // const videoSelectBtn = document.getElementById('videoSelectBtn');
    // videoSelectBtn.innerText = source.name;
    const video = document.getElementById('video');
    const recordBtn = document.getElementById('recordBtn');

    recordBtn.disabled = false;
    setSourceName(source.name);

    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id,
          // maxWidth: 1280,
          // maxHeight: 720,
          maxWidth: 960,
          maxHeight: 540,
          minWidth: 960,
          minHeight: 540,
        },
      },
    };

    // Create a Stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setCurrentStream(stream);
    // Preview the source in a video element
    video.srcObject = stream;
    video.source_id = source.id;
    video.play();

    // Create the Media Recorder
    const options = { mimeType: 'video/webm; codecs=vp9' };
    let mediaRecorder = new MediaRecorder(stream, options);
    // Register Event Handlers
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

    // console.log(mediaRecorder);

    setMediaRecorder(mediaRecorder);
  };

  const handleDataAvailable = (e) => {
    console.log('video data available');
    // console.log(e.data);
    recordedChunks.push(e.data);
    // setRecordedChunks([...recordedChunks, e.data]);
  };

  const handleStop = async (e) => {
    console.log(recordedChunks);
    const blob = new Blob(recordedChunks, {
      type: 'video/webm; codecs=vp9',
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const { filePath } = await remote.dialog.showSaveDialog({
      buttonLabel: 'Save video',
      defaultPath: `vid-${Date.now()}.webm`,
    });

    if (filePath) {
      writeFile(filePath, buffer, () =>
        console.log('video saved successfully!')
      );
    }
  };

  return (
    <button
      id='videoSelectBtn'
      className='button is-primary'
      onClick={getVideoSources}
    >
      {sourceName ? `Casting "${sourceName}"` : 'Choose a Video Source'}
    </button>
  );
};

export default VideoSelectBtn;
