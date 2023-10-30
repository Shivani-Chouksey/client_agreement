"use client"
import { getBrand_Info, postBrand_info, updateBrandInfo } from '@/acion/brandInfo'
import React, { useEffect, useState } from 'react'
import axios from '@/components/axios'
import { toast } from 'react-toastify'
const page = () => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        address: "",
        companyName: "",
        signature: "",

    })
    const [brandData, setBrandData] = useState({
        name: "",
        number: "",
        email: "",
        address: "",
        companyName: "",
        signature: "",
    })
    const [disabled, setDisabled] = useState(true);
    const [update, setUpdate] = useState({});

    const edit = () => {
        setDisabled(!disabled)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getBrand_Info();
                // const client=await getClient()
                console.log(" data  page ", data)
                setBrandData(data[0])

            } catch (error) {
                console.log(error)
            }
        }
        getData()

    }, [])

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setUpdate({ ...update, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(update)
        if (!disabled) {
            console.log(update)
           await updateBrandInfo(brandData._id,update)
            // await postBrand_info(update)

          
            setDisabled(!disabled)

            getBrand_Info()

        } else {
            toast.error("Please enable editing mode", {
                position: "top-center",

            });
        }
    }



//     const adminImgUpload = async (event) => {
//         alert(event.target.name)
//         const formData = new FormData;
// 
//         formData.append(event.target.name, event.target.files[0]);
// 
//         const { data } = await axios.post('/api/image-up                                                                        load', formData);
//         console.log(data)
//         setBrandData({ ...brandData, [event.target.name]: data.url })
// 
// 
//         //     toast.success(data.message, {
//         //       position: "top-center"
//         //     });
//     }

    console.log("brand info get", brandData._id)

    return (
        <>
            <div className='w-100'>
                <div className='container pt-4'>
                    <h1>Add Brand Information</h1>
                    <hr />
                    <form className="row  g-3 p-5 needs-validation" onSubmit={onSubmitHandler} noValidate>
                        <div className="col-md-6">
                            <label for="name" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" placeholder={`${brandData ? brandData.name : 'Admin Name'}`} name='name' value={formData.name} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4 " name='email' placeholder={`${brandData ? brandData.email : 'Company Email'}`} value={formData.email} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label for="number" className="form-label">Number</label>
                            <input type="number" className="form-control" id="number" placeholder={`${brandData ? brandData.number : 'Number'}`} name='number' value={formData.number} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-md-6">
                            <label for="companyName" className="form-label">Company Name</label>
                            <input type="name" className="form-control" id="companyName" placeholder={`${brandData ? brandData.companyName : 'Company Name'}`} name='companyName' value={formData.companyName} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        <div className="col-12">
                            <label for="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder={`${brandData ? brandData.companyName : '1234 Main St'}`} name='address' value={formData.address} onChange={onChangeHandler} required disabled={disabled} />
                        </div>
                        {/* <div className="col-md-6 col-12 my-3  ">
                            <label className="p-2" for="filetag">Signature</label>
                            
                            <input type="file" name='signature' id="filetag" onChange={adminImgUpload} />
                            <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                                <img src={brandData ? brandData.signature : ""} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Preview" />

                            </div >
                        </div> */}


                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>

                    </form>

                </div>
                <div className="col-3 mx-auto ">
                    <button type="submit" className="btn btn-warning" onClick={edit}><i className="bi bi-pencil-square me-2"></i>{disabled ? 'Enable Editing' : 'Disable Editing'}</button>
                </div>
            </div>
        </>
    )
}

export default page
