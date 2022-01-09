import React, { useEffect, useState } from "react"
import { Button, Input } from "antd"
import styled from "styled-components"
import { ImageUrl, ProductAsset } from "./ProductCatalogSearchResult"

type Props = {
  product: ProductAsset;
  storePrice: number;
  onChange: (value: number) => void;
}

type StoreProduct = {
  productCode: string;
  title: string;
  category: string;
  subCategory: string;
  unit: string;
  weight: number;
  maximumRetailPrice: number;
  image: ImageUrl;
  quantity: number;
  storePrice: number;
}

const Incrementor = ({ product, storePrice, onChange } : Props) => {
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    onChange(quantity);
  }, [quantity]);
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    if(quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {    
    setQuantity(+event.target.value);
  }

  const buttonStyle = { flex: 1, fontWeight: 'bold' }
  const IncrementorContainer = styled.div`
    display: flex;
    width: 100%;
  `

  return (
    <IncrementorContainer>
      <Button
        type="primary"
        style={buttonStyle}
        size={"middle"}
        onClick={decrementQuantity}
      >
        -
      </Button>
      <Input type="number" style={{ textAlign: "center", maxWidth: "70px"}} value={quantity} onChange={handleChangeQuantity} />
      <Button
        type="primary"
        style={buttonStyle}
        size={"middle"}
        onClick={incrementQuantity}
      >
        +
      </Button>
    </IncrementorContainer>
  );
} 

export default Incrementor
