import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = (props: any) => {
  const [data, setData] = React.useState("Not Found");

  const returnBarcodeResult = (result: any) => {
    props.data(result);
}

  return (
    <>
      <BarcodeScannerComponent
        facingMode="environment"
        onUpdate={(err, result:any) => {
          if (result) returnBarcodeResult(result.text);
          else setData("Not Found");
        }}
      />
    </>
  );
}

export default BarcodeScanner;