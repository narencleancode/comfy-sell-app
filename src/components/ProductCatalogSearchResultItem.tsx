import React from "react"
import { useState } from "react"
import { Button, Tag } from "antd"
import styled from "styled-components"
import Incrementor from "./Incrementor"
import { ProductCatalog } from "./ProductCatalogSearchResult"
import Title from "antd/lib/typography/Title"

type Props = {
  searchResultItem: ProductCatalog
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

const RupeeIcon = styled.img`
  height: 12px;
  width: 9px;
`
const Rupee = styled.span`
  padding: 0px 5px;
`

const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ProductCatalogSearchResultItem = ({searchResultItem}: Props) => {
  const [showQuantityIncremeter, setShowQuantityIncrementor] = useState(false)
  
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
                <Tag color="blue">{searchResultItem.category}</Tag>
                <Tag color="green">{searchResultItem.subCategory}</Tag>
                <div>{`${searchResultItem.weight} ${searchResultItem.unit}`}</div>
                <div><RupeeIcon src="rupees.png" alt="rupee"  />
                <Rupee>{searchResultItem.maximumRetailPrice}</Rupee>  
                </div>
                { !showQuantityIncremeter && <Button type="primary" style={{ width: "100px", float: "right"}} size={'middle'} onClick={addQuantity}>Add</Button> }
                { showQuantityIncremeter && <AlignRight><Incrementor /></AlignRight>}
              </SearchResultContent>
            </SearchResultContainer>
  </div>
  )
}

export default ProductCatalogSearchResultItem;