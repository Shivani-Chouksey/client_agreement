// "use client"
// 
// import React, { useEffect, useRef, useState } from 'react'
// 
// import { getAgreement } from '@/acion/agreement'
// import { getBrand_Info } from '@/acion/brandInfo'
// import ReactToPrint from 'react-to-print'
// const page = () => {
// 
//   const proposalRef = useRef()
//   const [allAgreement, setAllAgreement] = useState([])
//   const [brandInfo, setBrandInfo] = useState({})
// 
// 
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const agreement = await getAgreement();
//         const brandinfo = await getBrand_Info()
//         setAllAgreement(agreement)
//         setBrandInfo(brandinfo[0])
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getData()
// 
//   }, [])
// 
//   // console.log("data", allAgreement[0]?.adminData?.name);
//   console.log("all data", brandInfo)
// 
// 
//   // 
//   // 
//   //   useEffect(() => {
//   //     
//   //     document.getElementById("print").click()
//   // 
//   //     router.back()
//   // }, [])
// 
// 
// 
// 
//   return (
//     <>
// 
//       {
//         allAgreement && allAgreement.map((item, i) => {
// 
//           return <div key={i} ref={proposalRef} className="bg-secondary-subtle py-5">
// 
// 
//             <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded " >
// 
//               <h2 className='fw-bold py-4 text-center'>
// 
//                 {item.adminData.clientName}
//               </h2>
// 
//               <hr />
// 
// 
//               <div className="px-5 my-5">
//                 <p dangerouslySetInnerHTML={{ __html: item.adminData.description }} />
// 
// 
//               </div>
// 
//               <hr />
//               <div className='row mx-5'>
//                 <div className='col-md-6 col-12' >
//                   <p className='m-1 fw-semibold' >{brandInfo.name}</p>
//                   <p className='m-1 fw-semibold' >{brandInfo.email}</p>
//                   <p className='m-1 fw-semibold' >{brandInfo.number}</p>
//                   <p className='m-1 fw-semibold' >{brandInfo.companyName}</p>
//                   <p className='m-1 fw-semibold' >{brandInfo.address}</p>
//                   <img width={100} src={item.adminData.signature} />
// 
//                 </div>
//                 <div className='col-md-6 col-12 text-end' >
//                   <p className='m-1 fw-semibold' >{item.clientData.name}</p>
//                   <p className='m-1 fw-semibold' >{item.clientData.email}</p>
//                   <p className='m-1 fw-semibold' >{item.clientData.number}</p>
//                   <p className='m-1 fw-semibold' >{item.clientData.companyName}</p>
//                   <img className='mx-auto' width={100} src={item.clientData.signature} />
//                 </div>
//               </div>
// 
//               <ReactToPrint
//                 trigger={() => {
//                   return <button type='button' id='print' className='btn btn-success col-2' >Print Agreement </button>
//                 }}
//                 content={() => proposalRef.current}
//                 documentTitle=""
//                 onPrintError={(er) => console.log(er)}
//               />
//             </div>
//           </div>;
//         })
// 
//      
//       }
// 
//     </>
//   )
// }
// 
// export default page

"use client"
import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas'

import { deleteAgreement, getAgreement, postAgreement } from '@/acion/agreement';
import axios from 'axios';



import {
    EmailShareButton,
    EmailIcon
} from "react-share";

const Page = () => {


    const router = useRouter()
    const baseURL = "http://localhost:3000"
    const pathname = usePathname()

    const url = (baseURL + pathname)

    const [agreement, setAgreement] = useState({});


    const [agrData, setAgrData] = useState(
        {

            adminData: {
                agreementName: "",
                name: "",
                email: "",
                number: "",
                companyName: "",
                signature: "",
                date: "",
                address: "",
                location: "",
                ip: "",
                description: "",
                clientName: ""
            },
            clientData: {
                name: "",
                email: "",
                number: "",
                companyName: "",
                signature: "",
                location: "",
                ip: ""
            }
        }



    );
    // const [clientImage, setClientImage] = useState('');
    // const [adminImage, setAdminImage] = useState('');
    const [isInputVisible, setInputVisible] = useState(false);


    //   const [agreement, setAgreement] = useState({
    //     // agreement:[],
    //     agreement:[],
    //     // client:[]

    //   });
    // console.log(agrData.adminData.description)
    useEffect(() => {
        const getData = async () => {
            try {
                const agreementData = await getAgreement();
                // const client=await getClient()
                // console.log("agreement data  page ",agreement)
                setAgreement(agreementData)

            } catch (error) {
                console.log(error)
            }
        }
        getData()

    }, [])
    console.log("agreement all data ", agreement)

 

    console.log(agrData)

 


  
   
 

    return (
        <>

            <div className=" py-5">
                <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
                    <h1 className='text-center my-4'>All Agreement </h1>

                </div>


                <div className='row mx-5'>
                    {
                        Array.isArray(agreement)
                            ? agreement.map((data, i) => (
                                <div key={i} className='col-md-2   shadow-lg p-3 mb-5 bg-body-tertiary rounded  border' style={{ marginRight: "10px", marginBottom: "5px" }}>
                                    <h6 >Client Name : {data.adminData.clientName}</h6>
                                    {/* <p>Date  : {data.adminData.date}</p> */}
                                    <button className='btn btn-success my-2' onClick={() => router.push(`/documents/${data._id}`)}>See Agreement </button>

                                </div>
                            ))
                            : null
                    }

                </div>
            </div>
        </>
    );
};

export default Page;

