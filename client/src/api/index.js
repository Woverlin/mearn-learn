import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../constants";
const login = async (params) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, params);
    if(res.data.success){
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        return res.data;
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
export default {
  login,
};