import React from "react";
import Webcam from "react-webcam";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
  const WebcamCapture = (props: any) => {
    const webcamRef: any = React.useRef(null);

    const returnImageScanResult = (result: any) => {
        props.data(result);
    }
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
           }

        axios.post('http://127.0.0.1:4000/image-search', imageSrc,config)
            .then(res => {
                console.log("image detected", res.data);
                returnImageScanResult(res.data);
                
            })
        .catch(err => console.log(err));
      },
      [webcamRef]
    );
  
    return (
      <>
        <Webcam
          audio={false}
          height={"100%"}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={"100%"}
          videoConstraints={videoConstraints}
        />
        <CameraOutlined 
            style={{
                fontSize: 24,
                color: "#fff",
                position: "relative",
                left: "49%",
                bottom: "40px"
            }}
        
        onClick={capture}/>
      </>
    );
  };

  export default WebcamCapture
