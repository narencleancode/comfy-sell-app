import React from "react"
import ProductCatalogSearchResultItem from "./ProductCatalogSearchResultItem"

type ProductCatalogAsset = {
  searchResult: ProductAsset[];
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

const ProductCatalogSearchResult = ({searchResult}: ProductCatalogAsset) => {
  const storeId = "8888"; // TODO: fetch from authentication
 
  return (
    <div>
      {searchResult.map((searchResultItem: ProductAsset) => {
        return (
          <div key={searchResultItem.productCode}>
            <ProductCatalogSearchResultItem storeId={storeId} searchResultItem={searchResultItem} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductCatalogSearchResult;
