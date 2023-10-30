"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogout } from '@/acion/admin';


const Page = () => {

  const [data, setData] = useState({})
  const router = useRouter();

  const onClickHandler = () => {
    // Use router.push for client-side navigation
    router.push('/agreement');
  };
  const documentHandler = () => {
    // Use router.push for client-side navigation
    router.push('/documents');
  };
  const brandInfoHandler = () => {
    // Use router.push for client-side navigation
    router.push('/admin/brandinfo');
  };
  const createHandler = () => {
    // Use router.push for client-side navigation
    router.push('/create-agreement');
  };
  
  useEffect(() => {

    
    const userData = JSON.parse(localStorage.getItem('userData'));
    setData(userData); // Update state with user data from localStorage
  }, []); 



  const logout = async () => {
    await adminLogout();

    setData({ })
    localStorage.setItem('userData', null)
    router.push("/admin")
    // window.location.reload()

  }

  return (
    <>
      <div className='py-5 container text-center'>
        <h1 className='text-center mb-4'>Welcome to  Agreement Dashboard</h1>
        <div className='my-4'>
        <span className='me-4 fw-semibold'>{data && data.name}</span>
          <button className='btn btn-info ms-auto' onClick={logout}>Logout</button>
          {/* <button className='btn btn-warning ms-auto'>{data && data.name}</button> */}
        </div>
        <hr className='my-5'/>
        {/* <button className='btn btn-success' onClick={onClickHandler}>
          Create Agreement
        </button> */}
        <button className='btn btn-success mx-4' onClick={brandInfoHandler}>
          Add Brand Information
        </button>
        <button className='btn btn-success ms-5' onClick={documentHandler}>
          Created Agreements
        </button>
        <button className='btn btn-success ms-5' onClick={createHandler}>
          Create Agreement 
        </button>
      
       
      
      </div>
    </>
  );
};

export default Page;
