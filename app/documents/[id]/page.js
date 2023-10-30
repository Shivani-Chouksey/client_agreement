
"use client"
import { getClientAgreement, getClientAgreementbyId, patchClientAgreement } from '@/acion/clientAgreement'
import axios from '@/components/axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { toast } from 'react-toastify'
import SignatureCanvas from 'react-signature-canvas'
import {
    EmailShareButton,
    EmailIcon
} from "react-share";
import { usePathname, useRouter } from 'next/navigation'
import { getBrand_Info } from '@/acion/brandInfo'
import { updateAgreement } from '@/acion/agreement'
const page = ({ params }) => {



    const proposalRef = useRef()

    //     // const router = useRouter()
    //     const baseURL = "http://localhost:3000"
    //     const pathname = usePathname()
    // 
    //     const url = (baseURL + pathname)
    //     console.log(params)



    const [brandInfo, setBrandInfo] = useState({})
    const [agreement, setAgreement] = useState({})
    const [isInputVisible, setInputVisible] = useState(false);
    const [admin, setAdmin] = useState({})
    const [client, setClient] = useState({
        name: "",
        email: "",
        number: "",
        companyName: "",
        signature: "",
        address: "",
        location: {
            latitude: "",
            longitude: ""
        }

    })
    const id = params.id

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        alert("submit data");
        const id = agreement._id
        updateAgreement(id, client);


    };


    // 
    //         useEffect(() => {
    //     
    //             document.getElementById("print").click()
    //     
    //             router.back()
    //         }, [])




    useEffect(() => {

        const getData = async () => {

            try {
                const agreementData = await getClientAgreementbyId(id)
                const brandInfoData = await getBrand_Info()
                console.log("return by id data ", agreementData)
                setAgreement(agreementData)
                setBrandInfo(brandInfoData[0])
                setAdmin(agreementData.adminData)
                setClient(agreementData.clientData)


            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])






    const adminImgUpload = async (event) => {
        alert(event.target.name)
        const formData = new FormData;

        formData.append(event.target.name, event.target.files[0]);

        const { data } = await axios.post('/api/image-upload', formData);

        // console.log(" data", data)


        setAdmin({
            ...admin,
            [event.target.name]: data.url

        });

        console.log(" admin", admin)
        toast.success(data.message, {
            position: "top-center"
        });
    }




    console.log(agreement.adminData && agreement.adminData.signature)
    console.log(agreement)















    return (
        <>

            <div className="bg-secondary-subtle " >
                <div className="  p-3 px-5 " ref={proposalRef}>

                    <h2 className='fw-bold py-4 text-center'>
                        Agreement For
                        <span className='px-3'>{
                            admin.clientName


                        }</span>

                    </h2>

                    <hr />
                    <p dangerouslySetInnerHTML={{ __html: admin.description }} />


                    <div className="container px-5">

                        <div className="row container mx-auto my-5 pt-5">
                            <hr />
                            <div className="col-md-6 col-12">
                                {/* <p> <strong>Admin  location :</strong><br /> latitute -
                                    {admin.location && admin.location.latitude}

                                   
                                    ,
                                    <br /> longitude -
                                    {admin.location && admin.location.longitude}

                                   
                                </p> */}
                                {/* {adminData && adminData.location.latitude}  */}
                                {/* {adminData && adminData.location.longitude} */}
                                {/* <p> <strong>Ip Address :</strong> {admin.ip}</p> */}

                                <p className='m-0 fw-bold'>{brandInfo.name}</p>
                                <p className='m-0 fw-bold'>{brandInfo.email}</p>
                                <p className='m-0 fw-bold'>{brandInfo.number}</p>
                                <p className='m-0 fw-bold'>{brandInfo.address}</p>
                                <div className='mt-3' style={{ height: "100px", width: "200px" }}>

                                    <img src={agreement.adminData && agreement.adminData.signature} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />
                                </div>

                                {/* <div>
                                    <input type="file" name='signature' id="filetag" onChange={adminImgUpload} />
                                    <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                                    <img src={agreement.adminData && agreement.adminData.signature ? agreement.adminData.signature :"" } style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />


                                    </div >
                                </div> */}



                            </div>
                            <div className="col-md-6 col-12">
                                {/* <p> <strong>Client  location :</strong><br /> latitute - {client.location && client.location.latitude} , <br /> longitude -{client.location && client.location.longitude} </p>
                                <p> <strong>Ip Address :</strong> {client.ip}</p> */}

                                <p className='m-0 fw-bold'>{agreement.clientData && agreement.clientData.name}</p>
                                <p className='m-0 fw-bold'>{agreement.clientData && agreement.clientData.email}</p>
                                <p className='m-0 fw-bold'>{agreement.clientData && agreement.clientData.number}</p>
                                <p className='m-0 fw-bold'>{agreement.clientData && agreement.clientData.companyName}</p>
                                <p className='m-0 fw-bold'>{agreement.clientData && agreement.clientData.address}</p>

                                <div className='mt-3' style={{ height: "100px", width: "200px" }}>

                                    <img src={agreement.clientData && agreement.clientData.signature} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />
                                </div>
                            </div>

                            {/* <div className='d-flex align-item-center justify-content-between my-4  text-center'>
                                <EmailShareButton url={url}  >
                                <EmailIcon size={60} round={true} />
                            </EmailShareButton>
                            </div> */}
                            {/* <ReactToPrint
                                trigger={ <button type='button' id='print' className='btn btn-success d-none' >Print</button>}
                                content={() => proposalRef.current}
                                documentTitle=""
                                onPrintError={(er) => console.log(er)}

                            /> */}



                        </div>
                    </div>


                </div>
                <ReactToPrint
                    trigger={() => {
                        return <button type='button' id='print' className='btn btn-success  mb-2 ms-3' > <i className="bi bi-printer text-white fw-bold me-2"></i>Print  </button>
                    }}
                    content={() => proposalRef.current}
                    documentTitle=""
                    onPrintError={(er) => console.log(er)}
                />
            </div>

        </>
    )
}

export default page

