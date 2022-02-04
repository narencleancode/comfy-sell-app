import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { AudioFilled } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import { COMFY_SERVICE_URL } from "../services/config";
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3'

type Props = {
  onTextAvailable: (value: string) => void;
}

const VoiceRecorder = ({onTextAvailable}: Props) => {
  
  const recognizeVoice = (blobUrl: string, blob: Blob | Buffer) => {
    const formData = new FormData()
        formData.append('audio', new File([blob], 'file.wav'))
        axios.post(`${COMFY_SERVICE_URL}/speech-recognition`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response.data)
          onTextAvailable(response.data)
        })
    
    
  }
  // navigator.mediaDevices.getUserMedia({audio: true})
  // const {startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({audio: true, onStop: recognizeVoice, mediaRecorderOptions: {mimeType: 'audio/webm; codecs=pcm'}});
  const [recording, setRecording] = useState(false);
  const [recorder, _] = useState(new MicRecorder())
  
  const toggleRecording = async () => {
    if (recording) {
      const [buffer, blob]: [Buffer, Blob] = await recorder.stop().getMp3();
      // let blob = await recorder.getBlob();
      setRecording(false);
      recognizeVoice('', blob)
    } else {
      try {
        await recorder.start();
        setRecording(true);
      } catch(err) {
      }
    }
  }

  const RecordButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px

    @keyframes pulse {
      0% {
        box-shadow: 0 0 10px 10px #f5222d66;
      }
      
      70% {
        box-shadow: 0 0 0 50px 50px #f5222d00;
      }
    }

    button {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #1890ff;
      color: #fff;
      border: 0;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;

      &.recording {
        background: #f5222d;
        animation: pulse 1s ease-in-out infinite;
      }
    }
  `

  return (
    <>
      <RecordButtonContainer>
        <Title level={4}>Press button to {recording ? 'stop': 'start'}</Title>
        <button className={recording ? "recording": ""} onClick={toggleRecording}>
          {recording ? (<div style={{width: '24px', height: '24px', background: '#fff'}}></div>) : <AudioFilled style={{fontSize: 25}} />}
        </button>
      </RecordButtonContainer>
    </>
  );
}

export default VoiceRecorder;