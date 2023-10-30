import axios from "@/components/axios";

import { toast } from "react-toastify";


export const getClientAgreement = async (agreeName) => {
    try {
        const { data } = await axios.get(`/api/client/?agreeName=${agreeName}`);
        // console.log("action test", data)
        // const agreement = data.agreement
        // console.log("dfgsdhfggd",data)

        return data.agreement;

    } catch (error) {
        console.log(error)
    }
}
export const getClientAgreementbyId = async (id) => {
    try {

        const { data } = await axios.get(`/api/create?_id=${id}`);
        // console.log("action test", data)
        // const agreement = data.agreement
        // console.log("dfgsdhfggd",data)

        return data.agreement;

    } catch (error) {
        console.log(error)
    }
}


export const patchClientAgreement = async (agreeName, newData) => {
    try {
     
        const url = `/api/client/?agreeName=${agreeName}`;
        const response = await axios.patch(url, newData);
        // console.log('Response:', response.data);

    } catch (error) {
        console.log(error)
    }
}





