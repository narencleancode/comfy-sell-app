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
  image: ImageUrl;
}

export type ImageUrl = {
  thumbnailUrl: string;
  url: string;
}

const ProductCatalogSearchResult = ({searchResult}: ProductCatalogAsset) => {
 
  return (
    <div>
      {searchResult.map((searchResultItem: ProductAsset) => {
        return (
          <div key={searchResultItem.productCode}>
            <ProductCatalogSearchResultItem searchResultItem={searchResultItem} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductCatalogSearchResult;