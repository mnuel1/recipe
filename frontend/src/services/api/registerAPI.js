import { URL, PORT } from "../config";
import axios from "axios";

const API_BASE_URL = `${URL}${PORT}`

export const RegisterAPI = {
    register: async (endpoint, regData) => {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, regData);
        const { data } = response
        return data;
    },
    
    
}