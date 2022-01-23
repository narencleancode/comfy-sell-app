import React from "react"
import { STORE_ID } from "../services/config"
import { Divider, List, Skeleton } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"
import ProductCatalogSearchResultItem from "./ProductCatalogSearchResultItem"

type ProductCatalogAsset = {
  searchResult: ProductAsset[];
  next: () => void,
  hasMore: boolean;
}

export type ProductAsset = {
  productCode: string;
  title: string;
  category: string;
  subCategory: string;
  unit: string;
  weight: number;
  maximumRetailPrice: number;
  storePrice: number;
  quantity: number;
  image: ImageUrl;
}

export type ImageUrl = {
  thumbnailUrl: string;
  url: string;
}

const ProductCatalogSearchResult = ({searchResult, next, hasMore}: ProductCatalogAsset) => {
  const storeId = STORE_ID;
 
  return (
    <div 
    id="product-list"
    style={{
      minHeight: '200px',
      overflow: 'auto'
    }}>
      <InfiniteScroll
      dataLength={searchResult.length}
      hasMore={hasMore}
      next={next}
      loader={<div style={{display: 'grid', columnGap: '16px', gridTemplateColumns: '1fr 2fr'}}><Skeleton.Image></Skeleton.Image><Skeleton title paragraph active></Skeleton></div>}
      endMessage={<Divider orientation="center">End of results</Divider>}
      >
        <List
        dataSource={searchResult}
        renderItem={(searchResultItem: ProductAsset) => {
          return (
            <List.Item key={searchResultItem.productCode}>
              <ProductCatalogSearchResultItem storeId={storeId} searchResultItem={searchResultItem} />
            </List.Item>
          );
        }}
        ></List>
      </InfiniteScroll>
    </div>
  );
}

export default ProductCatalogSearchResult;
