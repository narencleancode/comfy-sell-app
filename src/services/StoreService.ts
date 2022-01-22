import axios from "axios";
import { InsertProductDto } from "../dtos/InsertProductDto";

const BASEURL = 'http://127.0.0.1:4000';

export const StoreService = {
    addOrUpdateProduct: (id: string, product: InsertProductDto) => {
        return axios.post(`${BASEURL}/store/${id}/store-catalog`, product);
    },

    addProductByCode: (id: string, productCode: string) => {
        return axios.post(`${BASEURL}/store/${id}/store-catalog/${productCode}`)
      }
};
