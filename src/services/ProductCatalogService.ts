import axios from "axios";
import { COMFY_SERVICE_URL } from "./config";

export const ProductCatalogService = {
    
  getProductCatalog: async (searchQuery?: string) => {
    return axios.get(`${COMFY_SERVICE_URL}/product-catalog?${searchQuery}`);
  },

};
