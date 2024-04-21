import axios from "axios";

axios.defaults.baseURL = process.env.DEVELOP_ENDPOINT;

const apiInstance = axios.create();
export { apiInstance };
