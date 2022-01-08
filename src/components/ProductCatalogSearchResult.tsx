import React from "react"
import ProductCatalogSearchResultItem from "./ProductCatalogSearchResultItem"

type Props = {
  searchResult: ProductCatalog[];
}

export type ProductCatalog = {
  productCode: string;
  title: string;
  category: string;
  subCategory: string;
  unit: string;
  weight: number;
  maximumRetailPrice: number;
  image: ImageUrl;
}

type ImageUrl = {
  thumbnailUrl: string;
  url: string;
}

const ProductCatalogSearchResult = ({searchResult}: Props) => {
 
  return (
    <div>
      {searchResult.map((searchResultItem: ProductCatalog) => {
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