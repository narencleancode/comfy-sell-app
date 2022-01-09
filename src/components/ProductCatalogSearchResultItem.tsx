import React from "react"
import { useState } from "react"
import { Button, Input, Tag } from "antd"
import styled from "styled-components"
import Incrementor from "./Incrementor"
import { ProductAsset } from "./ProductCatalogSearchResult"
import Title from "antd/lib/typography/Title"

type Props = {
  searchResultItem: ProductAsset
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

const ProductCatalogSearchResultItem = ({searchResultItem}: Props) => {
  const [showQuantityIncremeter, setShowQuantityIncrementor] = useState(false)
  const [storePrice, setStorePrice] = useState(searchResultItem.maximumRetailPrice);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStorePrice(+event.target.value);
  }

  const addQuantity = (event: React.MouseEvent<HTMLElement>) => {
    setShowQuantityIncrementor(true)
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
                { !showQuantityIncremeter && <Button type="primary" style={{ width: "100%", float: "right"}} size={'middle'} onClick={addQuantity}>Add</Button> }
                { showQuantityIncremeter && <AlignRight><Incrementor product={searchResultItem} storePrice={storePrice} /></AlignRight> }
              </SearchResultContent>
            </SearchResultContainer>
  </div>
  )
}

export default ProductCatalogSearchResultItem;