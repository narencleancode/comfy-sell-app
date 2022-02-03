import axios from "axios";
import { COMFY_IMAGE_RECOGNITION_SERVICE_URL } from "./config";

export const ProductImageRecognitionService = {
    
  recognize: async (data: any, config: any) => {
    return axios.post(`${COMFY_IMAGE_RECOGNITION_SERVICE_URL}/image-search`, data, config);
  },

};
