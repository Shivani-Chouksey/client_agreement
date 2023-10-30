"use client"
import React, { useState } from 'react';

const Page = () => {
  const [data, setData] = useState({
    adminName: '',
    adminNumber: '',
    adminEmail: '',
    adminCompanyName: '',
    adminSignature: '',
    clientName: '',
    clientNumber: '',
    clientEmail: '',
    clientCompanyName: '',
    clientSignature: '',
  });

  const [isInputVisible, setInputVisible] = useState(false);

  const getAdminData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleInputBlur = async (fieldName) => {
    // You can perform your postAdmin logic here if needed
    setInputVisible(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    alert('handle on submit');
    // Perform any necessary actions with the data here
    console.log(data);
  };

  const handleInputClick = (fieldName) => {
    setInputVisible(true);
  };

  const handleInputValueClick = () => {
    setInputVisible(true);
  };

  return (
    <>
      <div className="bg-secondary-subtle py-5">
        <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <h1 className="fs-2 text-center">Sales Employee Agreement</h1>
          <hr />

          <form onSubmit={onSubmitHandler}>
            <div className="px-5 my-5">
              <p className="">
                This Sales Employee Agreement ("Agreement") is made and entered into on this [Date] by and between
                Valuex Digital, a digital marketing agency with its principal place of business located at 516,
                Adharshila East Block Extension 80 Feet Road Awadhpuri, Bhopal, Madhya Pradesh, India, hereinafter
                referred to as the{' '}
                <div className=" d-inline-flex">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="adminCompanyName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminCompanyName')}
                      value={data.adminCompanyName} // Show the input value
                      placeholder="Company Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminCompanyName')}>{data.adminCompanyName ?data.adminCompanyName:"Enter Your Company Name"}</span>
                  )}
                </div>
                ["Company,"] and
                <div className=" d-inline-flex">
                {isInputVisible ? (
                    <input
                      type="text"
                      name="adminName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminName')}
                      value={data.adminName} // Show the input value
                      placeholder="Admin Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminName')}>{data.adminName ?data.adminName:"Enter  Admin Name  "}</span>
                  )}
                 
                </div>
                [ Admin Name], an individual with an address at 516 Adharshila East Block Extention 80 Feet Road
                Bhopal Madhya Pradesh India 462022 hereinafter referred to as the "Sales Employee."
              </p>

              <div></div>
            </div>

            <div className="container px-5">
              <h5 className="my-5 px-5">IN WITNESS WHEREOF, the parties hereto have executed this Sales Employee Agreement
                as of the date first above written.</h5>
              <div className="row container mx-auto my-5 pt-5">
                <div className="col-md-6 col-12">
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="adminName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminName')}
                      value={data.adminName} // Show the input value
                      placeholder="Admin Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminName')}>{data.adminName ?data.adminName:"Enter  Admin Name  "}</span>
                  )}
                 
                    {/* <input
                      type="text"
                      placeholder="Admin Name"
                      name="adminName"
                      onChange={getAdminData}
                      className="form-control"
                    /> */}

                  </div>
                  <div className="col-md-6 col-12 my-3">

                  {isInputVisible ? (
                    <input
                      type="text"
                      name="adminEmail"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminEmail')}
                      value={data.adminEmail} // Show the input value
                      placeholder="Admin Email"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminEmail')}>{data.adminEmail ?data.adminEmail:"Enter Your Company Email"}</span>
                  )}
                    
                  </div>
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="adminCompanyName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminCompanyName')}
                      value={data.adminCompanyName} // Show the input value
                      placeholder="Company Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminCompanyName')}>{data.adminCompanyName ?data.adminCompanyName:"Enter Your Company Name"}</span>
                  )}
                   
                  </div>
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="adminNumber"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('adminNumber')}
                      value={data.adminNumber} // Show the input value
                      placeholder="admin Number"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('adminNumber')}>{data.adminNumber ?data.adminNumber:"Enter Your Number"}</span>
                  )}
                    
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="clientName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('clientName')}
                      value={data.clientName} // Show the input value
                      placeholder="Client Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('clientName')}>{data.clientName ?data.clientName:"Enter Client  Name   "}</span>
                  )}
                 
                    {/* <input
                      type="text"
                      placeholder="Admin Name"
                      name="adminName"
                      onChange={getAdminData}
                      className="form-control"
                    /> */}

                  </div>
                  <div className="col-md-6 col-12 my-3">

                  {isInputVisible ? (
                    <input
                      type="text"
                      name="clientEmail"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('clientEmail')}
                      value={data.clientEmail} // Show the input value
                      placeholder="Client Email"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('clientEmail')}>{data.clientEmail ?data.clientEmail:"Client Email"}</span>
                  )}
                    
                  </div>
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="clientCompanyName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('clientCompanyName')}
                      value={data.clientCompanyName} // Show the input value
                      placeholder="Company Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('clientCompanyName')}>{data.clientCompanyName ?data.clientCompanyName:"Enter Your Company Name"}</span>
                  )}
                   
                  </div>
                  <div className="col-md-6 col-12 my-3">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="clientNumber"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('clientNumber')}
                      value={data.clientNumber} // Show the input value
                      placeholder="Client Number"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('clientNumber')}>{data.clientNumber ?data.clientNumber:"Enter Your Number"}</span>
                  )}
                    
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-success">Save data</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
