import axios from "@/components/axios";
import { toast } from "react-toastify";

export const adminLogin = async (loginData) => {
    try {
        const { data } = await axios.post('/api/admin/login', loginData);

        toast.success(data.message, {
            position: "top-center"
        })

        return data.data

    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });

        return null
    }
}


export const adminLogout = async () => {
    try {
        const { data } = await axios.get('/api/admin/logout');

        toast.success(data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });
    }
}

