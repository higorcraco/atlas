import axios from "axios";
import API_BASE_URL from "../config/ApiConfig";

const resource = `${API_BASE_URL}/users`;

export const findAll = () => axios.get(resource);
