import React from "react"
import { useState } from "react"
import { Button } from "antd"
import styled from "styled-components"
import Incrementor from "./Incrementor"
import { ProductCatalog } from "./ProductCatalogSearchResult"

type Props = {
  searchResultItem: ProductCatalog
}

const SearchResultContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 20px;
`
const SearchResultContent = styled.div `
  font-family: 'sans-serif';
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
                />
              </SearchResultContent>
              <SearchResultContent>
                <div>{searchResultItem.title}</div>
                <div>{`${searchResultItem.weight} ${searchResultItem.unit}`}</div>
                <div><RupeeIcon src="rupees.png" alt="rupee"  />
                <Rupee>{searchResultItem.maximumRetailPrice}</Rupee>  
                </div>
                { !showQuantityIncremeter && <Button type="primary" style={{ width: "100px", float: "right"}} size={'middle'} onClick={addQuantity}>Add</Button> }
                { showQuantityIncremeter && <Incrementor />}
              </SearchResultContent>
            </SearchResultContainer>
  </div>
  )
}

export default ProductCatalogSearchResultItem;