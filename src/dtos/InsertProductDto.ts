export type InsertProductDto = {
    productCode: string;
    title: string;
    category: string;
    subCategory: string;
    unit: string;
    weight: number;
    storePrice: number;
    maximumRetailPrice: number;
    image: ImageUrlDto;
    quantity: number;
  }
  
  export type ImageUrlDto = {
    thumbnailUrl: string;
    url: string;
  }