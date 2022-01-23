import React from "react"
import { useState } from "react"
import { Button, Col, Image, Input, Row, Tag } from "antd"
import styled from "styled-components"
import Incrementor from "./Incrementor"
import { ProductAsset } from "./ProductCatalogSearchResult"
import Title from "antd/lib/typography/Title"
import { StoreService } from "../services/StoreService"

type Props = {
  searchResultItem: ProductAsset,
  storeId: string
}

const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StoreProductCatalogSearchResultItem = ({searchResultItem, storeId}: Props) => {
  const isQuantityPresent = searchResultItem.quantity > 0;
  const [showQuantityIncremeter, setShowQuantityIncrementor] = useState(isQuantityPresent);
  console.log(`${searchResultItem.title} - ${searchResultItem.quantity} - ${searchResultItem.quantity > 0} - ${showQuantityIncremeter}`);
  
  const [storePrice, setStorePrice] = useState(searchResultItem.storePrice ?? searchResultItem.maximumRetailPrice);
  const [quantity, setQuantity] = useState(searchResultItem.quantity ?? 0);

  const saveProduct = (price?: number, qty?: number) => {
    StoreService.addOrUpdateProduct(storeId, {
      ...searchResultItem,
      storePrice: price ?? storePrice,
      quantity: qty ?? quantity
    });
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStorePrice(+event.target.value);
    saveProduct(+event.target.value, quantity);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    if (value > 0) {
      saveProduct(storePrice, value);
    }
  }

  const addQuantity = (event: React.MouseEvent<HTMLElement>) => {
    setShowQuantityIncrementor(true);
  }

  return (
    <Row gutter={16} style={{width: '100%', margin: 0}} wrap={false}>
      <Col flex={'140px'} style={{paddingLeft: 0}}>
        <Image
          src={searchResultItem.image.thumbnailUrl}
          alt={searchResultItem.title}
          width="100%"
          height={140}
          preview={{src: searchResultItem.image.url}}
          style={{objectFit: 'cover', borderRadius: '3px'}}
          placeholder
        />
      </Col>
      <Col flex="auto" style={{paddingRight: 0}}>
        <Title level={5}>{searchResultItem.title}</Title>
        <Tag color="magenta">{searchResultItem.category}</Tag>
        <Tag color="green">{searchResultItem.subCategory}</Tag>
        <div style={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
        <div style={{ width: "50%" }}>{`${searchResultItem.weight} ${searchResultItem.unit}`}</div>
        <Input type="number" addonBefore={"₹"} style={{ width: "70%", marginBottom: "8px" }} value={storePrice}  onChange={handlePriceChange} />
        </div>
        { !isQuantityPresent && <Button type="primary" style={{ width: "100%", float: "right"}} size={'middle'} onClick={addQuantity}>Add</Button> }
        { isQuantityPresent && <AlignRight><Incrementor product={searchResultItem} onChange={handleQuantityChange} /></AlignRight> }
      </Col>
    </Row>
  )
}

export default StoreProductCatalogSearchResultItem;
