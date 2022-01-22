import axios from "axios";
import { InsertProductDto } from "../dtos/InsertProductDto";
import { COMFY_SERVICE_URL } from "./config";

export const StoreService = {
    addOrUpdateProduct: async (id: string, product: InsertProductDto) => {
        return axios.post(`${COMFY_SERVICE_URL}/store/${id}/store-catalog`, product);
    },

    addProductByCode: async (id: string, productCode: string) => {
        return axios.post(`${COMFY_SERVICE_URL}/store/${id}/store-catalog/${productCode}`);
    },

    getStoreProductCatalog: async (storeId: string) => {
        return axios.get(`${COMFY_SERVICE_URL}/store/${storeId}`);
    }

};
