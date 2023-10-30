import axios from "@/components/axios";

import { toast } from "react-toastify";


export const getAgreement = async () => {
    try {

        const { data } = await axios.get("/api/agreement");
        // console.log("action",data)
        const agreement = data.agreement
        // console.log(agreement)
        return agreement;

    } catch (error) {
        console.log(error)
    }
}




export const postAgreement = async (agreementData) => {
    try {
        // console.log("agreement in action", agreementData)
        const response = await axios.post("/api/agreement", agreementData)
        // console.log("action", response.data.message)
        toast.success(response.data.message, {
            position: "top-center"
        });

    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })

    }
}


export const updateAgreement = async (id, newData) => {
    try {

        const url = `/api/agreement?_id=${id}`;
        const response = await axios.patch(url, newData);
        toast.success(response.data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })


    }
}





export const deleteAgreement = async (id) => {
    try {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            const response = await axios.delete(`/api/agreement?_id=${id}`);

            toast.success(response.data.message, {
                position: "top-center"
            });
            window.location.reload()
        } else {
            // User clicked Cancel, do nothing or show a message
            toast.info('Deletion canceled', {
                position: 'top-center',
            });



        }
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })

    }
}

