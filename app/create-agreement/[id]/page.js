
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

    // const router = useRouter()
    // const baseURL = "http://localhost:3000"
    const baseURL = "http://192.168.1.20:3000/"
    const pathname = usePathname()

    const url = (baseURL + pathname)
    console.log("axios baseurl", axios)



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

        console.log(" data", data)


        setAdmin({
            ...admin,
            [event.target.name]: data.url

        });

        console.log(" admin", admin)
        toast.success(data.message, {
            position: "top-center"
        });
    }




    // console.log(agreement.adminData && agreement.adminData.signature)



    useEffect(() => {

        const handlePermissionChange = async (result) => {


            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(showPosition);

            } else if (result.state === 'prompt') {
                alert('Please grant geolocation permission to use this feature.');
                result.onchange = () => {
                    if (result.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    }
                };
            } else {
                alert('Geolocation permission is denied. You may need to enable it in your browser settings.');
            }
        };


        const showPosition = async (position) => {
            try {
                const { data } = await axios.get("https://geolocation-db.com/json/");
                setClient({
                    ...client, location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude

                    },
                    ip: data.IPv4
                })
                //         setClient({
                //           ...agreement,
                //           clientData: {
                //             ...agreement.clientData,
                //             location: {
                //               latitude: position.coords.latitude,
                //               longitude: position.coords.longitude
                // 
                //             },
                //             ip: data.IPv4
                //           }
                //         });
            } catch (error) {
                console.log(error)
            }


        };



        navigator.permissions.query({ name: 'geolocation' }).then(handlePermissionChange);

    }, []);

    // 
    //     useEffect(() => {
    //   
    //       const handlePermissionChange = async (result) => {
    //   
    //   
    //         if (result.state === 'granted') {
    //           navigator.geolocation.getCurrentPosition(showPosition);
    //   
    //         } else if (result.state === 'prompt') {
    //           alert('Please grant geolocation permission to use this feature.');
    //           result.onchange = () => {
    //             if (result.state === 'granted') {
    //               navigator.geolocation.getCurrentPosition(showPosition);
    //             }
    //           };
    //         } else {
    //           alert('Geolocation permission is denied. You may need to enable it in your browser settings.');
    //         }
    //       };
    //   
    //   
    //       const showPosition = async (position) => {
    //         try {
    //           // const { data } = await axios.get("https://geolocation-db.com/json/");
    //           setAgreement({
    //             ...agreement,
    //             clientData: {
    //               ...agreement.clientData,
    //               location: {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude
    //   
    //               },
    //               // ip: data.IPv4
    //             }
    //           });
    //         } catch (error) {
    //           console.log(error)
    //         }
    //   
    //   
    //       };
    //   
    //   
    //   
    //       navigator.permissions.query({ name: 'geolocation' }).then(handlePermissionChange);
    //   
    //   
    //   
    //     }, []);




    const getClientData = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value })
        // setAgreement({ ...agreement, clientData: { ...agreement.clientData, [e.target.name]: e.target.value } });
    };


    const clientImgUpload = async (event) => {
        // alert(event.target.name)
        const formData = new FormData;

        formData.append(event.target.name, event.target.files[0]);

        const { data } = await axios.post('/api/image-upload', formData);

        setClient({
            ...client,
            [event.target.name]: data.url

        })

        // setAgreement({ ...agreement, clientData: { ...agreement.clientData, [event.target.name]: data.url } })

        toast.success(data.message, {
            position: "top-center"
        });
    }


    // console.log(agreement._id)

    const handleInputBlur = async (fieldName) => {

        setInputVisible(false);
    };




    const handleInputClick = (fieldName) => {

        setInputVisible(true);

    };

    return (
        <>

            <div className="bg-secondary-subtle " >
                <div className="  p-3 px-5 mb-1 " ref={proposalRef}>

                    <h2 className='fw-bold py-4 text-center'>
                        Agreement For
                        <span className='px-3'>{
                            admin.clientName


                        }</span>

                    </h2>

                    <hr />
                    <p dangerouslySetInnerHTML={{ __html: admin.description }} />


                    <div className="container">

                        <div className="row container mx-auto  pt-5">
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

                                    <img src={admin.signature} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />
                                </div>




                            </div>
                            <div className="col-md-6 col-12 text-end">
                                {/* <p> <strong>Client  location :</strong><br /> latitute - {client.location && client.location.latitude} , <br /> longitude -{client.location && client.location.longitude} </p>
                                <p> <strong>Ip Address :</strong> {client.ip}</p> */}
                                <form onSubmit={onSubmitHandler}>

                                    <div className="col-md-6 col-12 mb-2 ">
                                        {isInputVisible ? (
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={getClientData}
                                                onBlur={() => handleInputBlur('name')}
                                                value={client.name} // Show the input value
                                                placeholder="Client Name"
                                                className="form-control"
                                            />
                                        ) : (
                                            <span onClick={() => handleInputClick('name')}>{client.name ? client.name : "Enter Client  Name   "}</span>
                                        )}



                                    </div>

                                    <div className="col-md-6 col-12 my-2">

                                        {isInputVisible ? (
                                            <input
                                                type="text"
                                                name="email"
                                                onChange={getClientData}
                                                onBlur={() => handleInputBlur('email')}
                                                value={client.email}
                                                placeholder="Client Email"
                                                className="form-control"
                                            />
                                        ) : (
                                            <span onClick={() => handleInputClick('email')}>{client.email ? client.email : "Client Email"}</span>
                                        )}

                                    </div>
                                    <div className="col-md-6 col-12 my-2">
                                        {isInputVisible ? (
                                            <input
                                                type="text"
                                                name="companyName"
                                                onChange={getClientData}
                                                onBlur={() => handleInputBlur('companyName')}
                                                value={client.companyName}
                                                placeholder="Company Name"
                                                className="form-control"
                                            />
                                        ) : (
                                            <span onClick={() => handleInputClick('companyName')}>{client.companyName ? client.companyName : "Enter Your Company Name"}</span>
                                        )}

                                    </div>
                                    <div className="col-md-6 col-12 my-2">
                                        {isInputVisible ? (
                                            <input
                                                type="text"
                                                name="number"
                                                onChange={getClientData}
                                                onBlur={() => handleInputBlur('number')}
                                                value={client.number}
                                                placeholder="Client Number"
                                                className="form-control"
                                            />
                                        ) : (
                                            <span onClick={() => handleInputClick('number')}>{client && client.number ? client && client.number : "Enter Your Number"}</span>
                                            // <span onClick={() => handleInputClick('number')}>{agreement.clientData && agreement.clientData.number ? agreement.clientData.number : "Enter Your Number"}</span>
                                        )}

                                    </div>
                                    <div className='d-flex '>
                                        {/* <div className="col-md-6 col-12 my-3 bg-gray-300 ">
                                            <label className="p-2">Signature</label>
                                            <SignatureCanvas penColor='green'
                                                canvasProps={{ width: 225, height: 120, className: 'sigCanvas bg-gray-400 ' }}
                                            />

                                        </div> */}
                                        <div className='mt-1 d-flex gap-5 ' >
                                            {
                                                client.signature ? <div className='' style={{ height: "70px", width: "200px" }}>
                                                    <img src={client.signature ? client.signature : ""} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />


                                                </div > : <div>
                                                    <p className='fw-bolder'>Upload signature <span className='text-danger'>*</span>  </p>
                                                    <label htmlFor="filetag" className="form-label bg-dark-subtle rounded p-55" style={{ width: "200px", height: "100px" }}><span className='text-danger'><img style={{ height: "100%", width: "100%", objectFit: "cover" }} src='https://samagrashikshasnpr.in/student/images/signature-placeholder.png' /></span></label>

                                                    <input type="file" className='d-none' name='signature' id="filetag" onChange={clientImgUpload} />
                                                </div>
                                            }


                                        </div>
                                        {/* <div className='ms-3'>
                                            <label htmlFor="clientSignature" className="form-label">Upload Signature</label>

                                            <input type="file" name='signature' id="filetag" onChange={clientImgUpload} />
                                            <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                                                <img src={client.signature ? client.signature : ""} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Upload your  signature" />

                                            </div >
                                        </div> */}
                                    </div>
                                    {
                                        client ? "" : <button className="btn btn-success mt-3" type='submit' >Save data</button>
                                    }


                                </form>

                            </div>






                        </div>
                    </div>


                </div>
             
                    <div className='d-flex align-item-center mx-auto justify-content-evenly pb-3  text-center w-25'>
                        <EmailShareButton url={url}  >
                            <EmailIcon size={60} round={true} />
                        </EmailShareButton>
                        {
                            client ? <ReactToPrint
                                trigger={() => {
                                    return <button type='button' id='print' className='btn  btn-success  rounded-circle px-4  ' > <i class="bi bi-printer text-white "></i> </button>
                                }}
                                content={() => proposalRef.current}
                                documentTitle=""
                                onPrintError={(er) => console.log(er)}
                            /> : " "
                        }
                    </div>

            </div>


        </>
    )
}

export default page

