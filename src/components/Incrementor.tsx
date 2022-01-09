import React, { useState } from "react"
import { Button, Input } from "antd"
import styled from "styled-components"
import { ImageUrl, ProductAsset } from "./ProductCatalogSearchResult"

type Props = {
  product: ProductAsset;
  storePrice: number;
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

const constructStoreProduct = (productAsset: ProductAsset, quantity: number, storePrice: number): StoreProduct => {
  return {
    ...productAsset,
    quantity,
    storePrice
  }
}

const Incrementor = ({ product, storePrice } : Props) => {
  const [quantity, setQuantity] = useState(1);
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    console.log(constructStoreProduct(product, quantity, storePrice));
  }

  const decrementQuantity = () => {
    if(quantity > 0) {
      setQuantity(quantity - 1);
      constructStoreProduct(product, quantity, storePrice);
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