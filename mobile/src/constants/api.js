import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.51.91:3000"
});

export default api