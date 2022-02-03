import React from "react";
import WebCam from "react-webcam";
import { message } from "antd"
import { CameraOutlined } from "@ant-design/icons";
import Tesseract from "tesseract.js";
import { ProductCatalogService } from "../services/ProductCatalogService";
import { ProductImageRecognitionService } from "../services/ProductImageRecognitionService";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

const WebCamCapture = ({ updateSearchText, data,  webCamType }: any) => {
  const webCamRef = React.useRef<WebCam>(null);

  const returnImageScanResult = (result: any) => {
    if(webCamType === "OCR") {
      data(result);
    } else if(webCamType === "IMG") {
      updateSearchText(result);
    }
  }

  const sanitizeWords = (text: string) => {
    return text.split(" ")
      .map((word) =>
        word.match(/[A-Za-z]+/g));
  }

  const dataURLtoFile = (dataurl: any, filename: string) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const capture = React.useCallback(
    async () => {
      const imageSrc = webCamRef.current?.getScreenshot()!;
      message.success({content: `Image recognizing`, key: "Image", duration: 2.5});
      
      if (webCamType === "OCR") {
        Tesseract.recognize(
          imageSrc,
          'eng',
          { logger: m => console.log(m) }
        )
          .then(({ data: { text } }) => {
            if (text) {

              ProductCatalogService.getProductCatalog(`multiQuery=${sanitizeWords(text)}`)
                .then((response) => {
                  returnImageScanResult(response.data);
                });
            }
          });
      } else if(webCamType === "IMG") {
        const imageSrc = webCamRef.current?.getScreenshot();
        const file = dataURLtoFile(imageSrc, 'image.jpg');
        const data = new FormData();
        data.append('file', file);
        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }

        ProductImageRecognitionService.recognize(data, config).then(res => {
          if (res.data.length > 0) {
            console.log(res.data[0].className);
            returnImageScanResult(res.data[0].className);
          } else {
            returnImageScanResult('');
          }
        }).catch(err => console.log(err));
      }

    }, [webCamRef]
  );
  
  return (
    <>
      <WebCam
        audio={false}
        height={"100%"}
        ref={webCamRef}
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

        onClick={capture} />
    </>
  );
};

export default WebCamCapture
