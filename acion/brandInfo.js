import axios from "@/components/axios";

import { toast } from "react-toastify";


export const getBrand_Info = async () => {
    try {

        const { data } = await axios.get("/api/brandInfo");
        const brandInfo = data.brandinfo
        // console.log(agreement)
        return brandInfo;

    } catch (error) {
        console.log(error)
    }
}


export const postBrand_info = async (brandinfo) => {
    try {

        const response = await axios.post("/api/brandInfo", brandinfo)
        // console.log("action",response)
        toast.success(response.data.message, {
            position: "top-center"
        });

    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" })

    }
}


export const updateBrandInfo = async (id, newData) => {
    try {

        const url = `/api/brandInfo?_id=${id}`;
        const response = await axios.patch(url, newData);
        console.log(url)
        console.log(response)
        toast.success(response.data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })


    }
}

