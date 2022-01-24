import React from "react";
import WebCam from "react-webcam";
import { message } from "antd"
import { CameraOutlined } from "@ant-design/icons";
import Tesseract from "tesseract.js";
import { ProductCatalogService } from "../services/ProductCatalogService";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

const WebCamCapture = (props: any) => {
  const webCamRef = React.useRef<WebCam>(null);

  const returnImageScanResult = (result: any) => {
    props.data(result);
  }

  const sanitizeWords = (text: string) => {
    return text.split(" ")
      .map((word) =>
        word.match(/[A-Za-z]+/g));
  }

  const capture = React.useCallback(
    async () => {
      const imageSrc = webCamRef.current?.getScreenshot()!;
      message.success({content: `Image recognizing`, key: "Image", duration: 2.5});
         
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
