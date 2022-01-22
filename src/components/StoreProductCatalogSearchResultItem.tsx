import React from "react"
import { useState } from "react"
import { Button, Input, Tag } from "antd"
import styled from "styled-components"
import Incrementor from "./Incrementor"
import { ProductAsset } from "./ProductCatalogSearchResult"
import Title from "antd/lib/typography/Title"
import { StoreService } from "../services/StoreService"

type Props = {
  searchResultItem: ProductAsset,
  storeId: string
}

const SearchResultContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 10px;
`
const SearchResultContent = styled.div `
  font-size: 16px;
  padding: 10px 10px;
`

const ThumbnailImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
`

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

  return (<div>
    <SearchResultContainer>
              <SearchResultContent>
                <ThumbnailImage
                  src={searchResultItem.image.thumbnailUrl}
                  alt={searchResultItem.title}
                  loading="lazy"
                />
              </SearchResultContent>
              <SearchResultContent>
                <Title level={5}>{searchResultItem.title}</Title>
                <Tag color="magenta">{searchResultItem.category}</Tag>
                <Tag color="green">{searchResultItem.subCategory}</Tag>
                <div style={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
                <div style={{ width: "50%" }}>{`${searchResultItem.weight} ${searchResultItem.unit}`}</div>
                <Input type="number" addonBefore={"₹"} style={{ width: "70%", marginBottom: "8px" }} value={storePrice}  onChange={handlePriceChange} />
                </div>
                { !isQuantityPresent && <Button type="primary" style={{ width: "100%", float: "right"}} size={'middle'} onClick={addQuantity}>Add</Button> }
                { isQuantityPresent && <AlignRight><Incrementor product={searchResultItem} onChange={handleQuantityChange} /></AlignRight> }
              </SearchResultContent>
            </SearchResultContainer>
  </div>
  )
}

export default StoreProductCatalogSearchResultItem;
