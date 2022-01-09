import axios from "axios";
import { InsertProductDto } from "../dtos/InsertProductDto";

export const StoreService = {
    addOrUpdateProduct: (id: string, product: InsertProductDto) => {
        return axios.post(`http://127.0.0.1:4000/store/${id}/store-catalog`, product);
    }
};
