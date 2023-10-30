import axios from "axios";

const axiosURL=axios.create({
    baseURL:"http://192.168.1.20:3000/"
    // baseURL:"http://localhost:3000/"
    // baseURL:"https://www.management.vxd.digital/"
});

export default axiosURL