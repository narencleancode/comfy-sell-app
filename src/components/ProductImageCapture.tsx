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
        const file = dataURLtoFile(imageSrc, 'image.jpg');
        const data = new FormData();
        data.append('file', file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://127.0.0.1:5000/image-search', data, config).then(res => {
                if(res.data.length > 0) {
                    returnImageScanResult(res.data[0].className);
                } else {
                    returnImageScanResult('');
                }
            })
        .catch(err => console.log(err));
      }, [webcamRef]
    );

    function dataURLtoFile(dataurl:any, filename:string) {

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
           u8arr[n] = bstr.charCodeAt(n);
       }

       return new File([u8arr], filename, {type:mime});
    }
  
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
