import React from "react"
import { Button, Tag } from "antd"
import styled from "styled-components"
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

const ProductCatalogSearchResultItem = ( {searchResultItem, storeId }: Props) => {

  const addQuantity = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    StoreService.addOrUpdateProduct(storeId, {
      ...searchResultItem,
      storePrice: searchResultItem.maximumRetailPrice,
      quantity: 1
    });
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
                <div>MRP {`₹ ${searchResultItem.maximumRetailPrice}`}</div>
                </div>
                <Button type="primary" style={{ width: "100%", float: "right"}} size={'middle'} onClick={addQuantity} >Add</Button>
              </SearchResultContent>
            </SearchResultContainer>
  </div>
  )
}

export default ProductCatalogSearchResultItem;
