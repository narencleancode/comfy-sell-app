import React from "react"
import { Button, Tag, message, Row, Col, Image } from "antd"
import { ProductAsset } from "./ProductCatalogSearchResult"
import Title from "antd/lib/typography/Title"
import { StoreService } from "../services/StoreService"

type Props = {
  searchResultItem: ProductAsset,
  storeId: string
}

const ProductCatalogSearchResultItem = ( {searchResultItem, storeId }: Props) => {

  const addQuantity = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    StoreService.addOrUpdateProduct(storeId, {
      ...searchResultItem,
      storePrice: searchResultItem.maximumRetailPrice,
      quantity: 1
    }).then((response) => {
      message.success({content: `Added product ${searchResultItem.title}`, key: searchResultItem.productCode, duration: 2.5})
    })
    .catch(() => {
      message.error({content: `Unable to identify product`, key: searchResultItem.productCode, duration: 2.5})
    })
  }
    
  return (
    <Row gutter={16}>
      <Col span={10}>
        <Image
          src={searchResultItem.image.thumbnailUrl}
          alt={searchResultItem.title}
          width={'100%'}
          height={140}
          preview={{src: searchResultItem.image.url}}
          style={{objectFit: 'cover', borderRadius: '3px'}}
          placeholder
        />
      </Col>
      <Col span={14}>
        <Title level={5}>{searchResultItem.title}</Title>
        <Tag color="magenta">{searchResultItem.category}</Tag>
        <Tag color="green">{searchResultItem.subCategory}</Tag>
        <div style={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
        <div style={{ width: "50%" }}>{`${searchResultItem.weight} ${searchResultItem.unit}`}</div>
        <div>MRP {`₹ ${searchResultItem.maximumRetailPrice}`}</div>
        </div>
        <Button type="primary" style={{ width: "100%", float: "right"}} size={'middle'} onClick={addQuantity} >Add</Button>
      </Col>
    </Row>
  )
}

export default ProductCatalogSearchResultItem;
