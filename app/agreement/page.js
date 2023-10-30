"use client"
import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas'

import { getAgreement, postAgreement } from '@/acion/agreement';
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

  const [location, setLocation] = useState({})

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
        description:""
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
console.log(agrData.adminData.description)
  useEffect(() => {
    const getData = async () => {
      try {
        const agreement = await getAgreement();
        // const client=await getClient()
        // console.log("agreement data  page ",agreement)
        setAgreement({ ...agreement, agreement })

      } catch (error) {
        console.log(error)
      }
    }
    getData()

  }, [])


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
        setAgrData({
          ...agrData,
          adminData: {
            ...agrData.adminData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude

            },
            ip: data.IPv4
          }
        });
      } catch (error) {
        console.log(error)
      }


    };



    navigator.permissions.query({ name: 'geolocation' }).then(handlePermissionChange);

  }, []);

  console.log(agrData)

  const getAdminData = (e) => {

    setAgrData({ ...agrData, adminData: { ...agrData.adminData, [e.target.name]: e.target.value } });
  };

  const getClientData = (e) => {

    setAgrData({ ...agrData, clientData: { ...agrData.clientData, [e.target.name]: e.target.value } });
  };
  //   const getData = (e) => {
  //  
  //     setAgrData({ ...agrData,adminData:{...agrData.adminData , [e.target.name]: e.target.value } });
  //   };


  // 
  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  // 
  //     if (file) {
  //       const reader = new FileReader();
  // 
  //       reader.onload = (e) => {
  //         setClientImage(e.target.result);
  //       };
  // 
  //       reader.readAsDataURL(file);
  //     }
  //   }

  // { ...agrData,clientData:{...agrData.clientData , [e.target.name]: e.target.value }
  const adminImgUpload = async (event) => {
    alert(event.target.name)
    const formData = new FormData;

    formData.append(event.target.name, event.target.files[0]);

    const { data } = await axios.post('/api/image-upload', formData);

    setAgrData({ ...agrData, adminData: { ...agrData.adminData, [event.target.name]: data.url } })

    toast.success(data.message, {
      position: "top-center"
    });
  }
  const clientImgUpload = async (event) => {
    alert(event.target.name)
    const formData = new FormData;

    formData.append(event.target.name, event.target.files[0]);

    const { data } = await axios.post('/api/image-upload', formData);

    setAgrData({ ...agrData, clientData: { ...agrData.clientData, [event.target.name]: data.url } })

    toast.success(data.message, {
      position: "top-center"
    });
  }


  //   useEffect(() => {
  //     const axiosData = async () => {
  //       try {
  //         const {data} = await axios.get("https://geolocation-db.com/json/f2e84010-e1e9-11ed-b2f8-6b70106be3c8")
  //         console.log("api data", )
  //       } catch (error) {
  // 
  //       }
  //     }
  //     axiosData()
  //   }, [])




  const handleInputBlur = async (fieldName) => {

    setInputVisible(false);
  };

  const onSubmitHandler = async (e) => {

    e.preventDefault();
    alert('handle on submit');
    console.log(agrData)
    postAgreement(agrData);
    const agreeName = agrData.adminData.agreementName
    // console.log(agreeName)

    router.push(`/agreement/client/${agreeName}`)
    // router.push(`/agreement/client/${agrData.adminData.agreementName}`)


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
        <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded ">


          <form onSubmit={onSubmitHandler}>
            <div className="col-12" >
              {/* <label htmlFor="description" className="form-label">Description <span className='text-danger'>*</span></label> */}
{/* 
              <JoditEditor
                value={agrData.adminData.description}
     
                onChange={content => setAgrData({  ...agrData,adminData :{...agrData.adminData, description: content} })}
              /> */}

            </div>
            <div className="  px-2 py-2  my-4 mx-auto bg-dark-subtle ">
              {isInputVisible ? (
                <input
                  type="text"
                  name="agreementName"
                  onChange={getAdminData}
                  onBlur={() => handleInputBlur('agreementName')}
                  value={agrData.adminData.agreementName} // Show the input value
                  placeholder="Agreement Name "
                  className="form-control"
                />
              ) : (
                <h2 className='text-center' onClick={() => handleInputClick('agreementName')}>{agrData.adminData.agreementName ? agrData.adminData.agreementName : " Sales Employee Agreement"}</h2>
              )}
            </div>
            <hr />


            <div className="px-5 my-5">
              <p className="">
                This Sales Employee Agreement ("Agreement") is made and entered into on this
                <div className=" d-inline-flex px-2 mx-2 bg-dark-subtle">
                  {isInputVisible ? (
                    <input
                      type="date"
                      name="date"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('date')}
                      value={agrData.adminData.date} // Show the input value
                      placeholder="Date"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('date')}>{agrData.adminData.date ? agrData.adminData.date : " DD / MM /YY "}</span>
                  )}
                </div>
                [Date] by and between
                Valuex Digital, a digital marketing agency with its principal place of business located at 516,
                Adharshila East Block Extension 80 Feet Road Awadhpuri, Bhopal, Madhya Pradesh, India, hereinafter
                referred to as the{' '}
                <div className="d-inline-flex px-2 mx-2 bg-dark-subtle">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="companyName"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('companyName')}
                      value={agrData.adminData.companyName} // Show the input value
                      placeholder="Company Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('companyName')}>{agrData.adminData.companyName ? agrData.adminData.companyName : "Enter Your Company Name"}</span>
                  )}
                </div>
                ["Company,"] and
                <div className=" d-inline-flex px-2 mx-2 bg-dark-subtle">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="company"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('name')}
                      value={agrData.adminData.name} // Show the input value
                      placeholder="Admin Name"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('name')}>{agrData.adminData.name ? agrData.adminData.name : "Enter  Admin Name  "}</span>
                  )}

                </div>
                [ Admin Name], an individual with an address at

                <div className=" d-inline-flex px-2 mx-2 bg-dark-subtle">
                  {isInputVisible ? (
                    <input
                      type="text"
                      name="address"
                      onChange={getAdminData}
                      onBlur={() => handleInputBlur('address')}
                      value={agrData.adminData.address} // Show the input value
                      placeholder="Company Address"
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleInputClick('address')}>{agrData.adminData.address ? agrData.adminData.address : "Company Address  "}</span>
                  )}

                </div>
                {/* 516 Adharshila East Block Extention 80 Feet Road
                Bhopal Madhya Pradesh India 462022  */}

                hereinafter referred to as the "Sales Employee."
              </p>

              <div></div>
            </div>

            <div className=' list container px-5'>

              <ul class="list-group list-group-flush">
                <li class="list-group-item py-4"><strong>Position and Duties:</strong>The Company hereby employs the Sales Employee as a Sales
                  Representative. The Sales Employee's primary duties shall include, but are not
                  limited to, identifying and prospecting potential clients, presenting the Company's
                  digital marketing services, negotiating contracts, and achieving sales targets as
                  outlined by the Company.</li>
                <h5 className='fw-bold text-center my-4'>Compensation:</h5>
                <li class="list-group-item py-4"> <strong>a. Base Salary:</strong>   The Sales Employee shall be entitled to a base
                  salary of 12860 per month Including 3125 Dearness Allowance, payable in
                  accordance with the Company's regular payroll schedule. <br /> <strong>b. Commission:</strong>  In addition
                  to the base salary, the Sales Employee shall be eligible for commission on sales as
                  per the Company's commission structure, which will be provided separately. <br /><strong>c.
                    Benefits:</strong>   The Sales Employee shall be entitled to any benefits as per the Company's
                  policies, including but not limited to health insurance, travel allowances, and other
                  applicable benefits</li>
                <li class="list-group-item py-4"> <srong>Non-Disclosure and Non-Compete:</srong> During the term of employment and thereafter,
                  the Sales Employee agrees not to disclose any confidential information, trade
                  secrets, or proprietary information of the Company to any third party. In case sales
                  Employee is The Sales Employee also agrees not to engage in any competitive
                  activities that may directly or indirectly harm the Company's business interests during
                  the employment period and for a period of 365 Days after the termination of
                  employment</li>
                <li class="list-group-item py-4"><strong>Termination:</strong> <br /> <strong>a. </strong>  Either party may terminate this Agreement with 30 Days written notice
                  to the other party.  <br /> <strong>b.</strong> The Company may terminate the Sales Employee's employment
                  immediately for cause, including but not limited to breach of confidentiality,
                  dishonesty, or poor performance. </li>

              </ul>
              <h5 className='my-4 fw-bold text-center'>Confidentiality and Data Sharing Policy</h5>
              <p>As a Sales Employee of Valuex Digital, you are entrusted with access to sensitive and
                confidential information, including client data, business strategies, and proprietary
                information. Maintaining the confidentiality of this information is of utmost importance to
                protect our clients and our business. This policy outlines the consequences of sharing such
                confidential data with other companies.
                Pranjal Shrivastava
                516 Adharshila East Block Extention 80 Feet Road
                Bhopal Madhya Pradesh India 462022</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-4"><strong>Confidential Information:</strong> Confidential information includes, but is not limited to,
                  client lists, contact information, business plans, marketing strategies, pricing
                  structures, trade secrets, and any other information not publicly available. You are
                  prohibited from sharing, disclosing, or using such confidential information for any
                  purpose other than fulfilling your duties as a Sales Employee of Valuex Digital</li>
                <li class="list-group-item py-4"> <strong>Data Sharing Prohibition:</strong>  If it is discovered that you have shared or disclosed
                  confidential information with other companies, directly or indirectly, without proper
                  authorization, you will be in breach of this policy. Sharing data without proper
                  authorization includes but is not limited to verbal communication, written
                  correspondence, electronic communication, or any form of data transfer</li>
                <h5 className='my-4 fw-bold text-center'>Salary Hold and Termination:</h5>
                <p>In the event that you are found to have violated the
                  data sharing prohibition outlined in this policy, Valuex Digital reserves the right to take
                  the following actions:</p>
                <li class="list-group-item py-4"><strong>a. Salary Hold:</strong>   Your salary may be temporarily held until the dispute is fully investigated and
                  resolved. During this period, you will not receive your regular salary payments. <br /> <strong>b. Termination:</strong> Valuex Digital retains the sole discretion to terminate your employment with
                  immediate effect if it is determined, following a thorough investigation, that you have shared
                  confidential information with other companies. Termination may occur without prior notice,
                  and you will forfeit any further compensation, benefits, or entitlements <br /> Resolution and Legal Action: If you are subject to a salary hold or termination due to
                  data sharing, you will have the opportunity to provide an explanation and participate
                  in the investigation. However, if the investigation concludes that you are indeed in
                  breach of this policy, Valuex Digital may pursue legal remedies to recover damages
                  resulting from the data sharing.</li>


              </ul>
              <ul class="list-group list-group-flush">
                <h5 className='fw-bold text-center my-4'>Financial Liability:</h5>
                <li class="list-group-item py-4"><strong></strong> In the unfortunate event that Valuex Digital incurs financial
                  losses directly attributed to the unauthorised sharing of confidential data by a Sales
                  Employee, the following actions may be taken</li>
                <h5 className='fw-bold text-center my-4'>Data Sharing Prohibition:</h5>
                <li class="list-group-item py-4">   If it is discovered that you have shared or disclosed
                  confidential information with other companies, directly or indirectly, without proper
                  authorization, you will be in breach of this policy. Sharing data without proper
                  authorization includes but is not limited to verbal communication, written
                  correspondence, electronic communication, or any form of data transfer</li>
                <li class="list-group-item py-4"><strong>a. Investigation:</strong> Valuex Digital will conduct a thorough investigation to determine the extent
                  of the financial loss and its connection to the unauthorised data sharing. <br /> <strong>b. Financial Assessment:</strong>  Based on the investigation's findings, the Sales Employee
                  responsible for the unauthorised data sharing may be held financially liable for the losses
                  incurred by Valuex Digital. This liability may include compensation for actual financial
                  damages, legal fees, and any associated costs </li>


              </ul>
              <ul class="list-group list-group-flush">
                <h5 className='fw-bold text-center my-4'>Process of Financial Liability Determination:</h5>



                <li class="list-group-item py-4"><strong>a. Notice and Explanation:</strong> The
                  Sales Employee will be informed in writing about the financial loss attributed to their
                  actions and will be given the opportunity to provide an explanation within a specified
                  timeframe.<br /><strong>b. Consultation:</strong>The Sales Employee may have the option to consult with legal counsel or
                  a representative before responding.
                  <br /> <strong>c. Decision:</strong>  After considering the Sales Employee's response, Valuex Digital will make a
                  decision regarding the extent of financial liability, if any. This decision will be communicated
                  to the Sales Employee in writing.</li>


              </ul>
              <ul class="list-group list-group-flush">
                <h5 className='fw-bold text-center my-4'>Resolution and Payment: </h5>



                <li class="list-group-item py-4"><strong>a. Payment Agreement:</strong> If the Sales Employee is found to
                  be financially liable for the losses, both parties may enter into a payment agreement
                  outlining the terms and schedule of repayment<br /><strong>b. Deductions:</strong>Valuex Digital reserves the right to deduct the agreed-upon amount from the
                  Sales Employee's salary, benefits, or any other entitlements until the financial liability is fully
                  satisfied
                </li>

                <h5 className='fw-bold text-center my-4'>Legal Recourse:</h5>
                <li class="list-group-item py-4">If the Sales Employee disputes the financial liability determination
                  or refuses to cooperate in resolving the matter, Valuex Digital may pursue legal
                  remedies to recover the incurred losses.
                </li>


              </ul>

              <h5 className='fw-bold text-center my-4'>Policy on False Commitments and Misrepresentations</h5>
              <p>At Valuex Digital, we uphold the highest standards of integrity, professionalism, and
                transparency in all our interactions with clients, partners, and stakeholders. This policy
                outlines our stance on making false commitments and misrepresentations and the
                consequences of engaging in such behaviour</p>

              <ul class="list-group list-group-flush">
                <li class="list-group-item py-4"><strong>False Commitments and Misrepresentations Defined:</strong> False commitments refer to
                  any promises, statements, or guarantees made by an employee that are not
                  accurate, truthful, or feasible. Misrepresentations encompass any intentional or
                  unintentional distortion of facts, figures, or information, whether through verbal
                  communication, written correspondence, presentations, or other means.</li>
                <li class="list-group-item py-4"> <strong>Prohibition of False Commitments and Misrepresentations:</strong>  All employees of
                  Valuex Digital are strictly prohibited from making false commitments or engaging in
                  misrepresentations in any form, whether to clients, partners, colleagues, or any other
                  individuals or entities</li>
                <li class="list-group-item py-4"> <strong>Consequences of False Commitments and Misrepresentations:</strong>   Engaging in
                  false commitments or misrepresentations can have serious repercussions for both
                  Valuex Digital and its reputation. Therefore, the following actions will be taken in
                  response to such behaviour:</li>

                <li class="list-group-item py-4"><strong>a. Investigation: </strong>  Upon receiving credible information or evidence of false commitments or
                  misrepresentations, Valuex Digital will initiate an internal investigation to determine the
                  veracity of the claims.<br /> <strong>b. Disciplinary Action:</strong>  If the investigation confirms that false commitments or
                  misrepresentations have occurred, the responsible employee will be subject to appropriate
                  disciplinary action, which may include verbal or written warnings, suspension, or termination
                  of employment.<br /><strong>c. Client Remediation:</strong> If a client has been adversely affected by false commitments or
                  misrepresentations, Valuex Digital will take steps to remedy the situation, which may include
                  financial compensation, adjusting service agreements, or providing additional services.
                </li>
                <h5 className='fw-bold text-center my-4'>Reporting and Whistleblower Protection:</h5>

                <li class="list-group-item py-4"> Valuex Digital encourages employees to
                  report any instances of false commitments or misrepresentations promptly. We have
                  a zero-tolerance policy for retaliation against employees who make good-faith
                  reports, and their identities will be kept confidential to the extent allowed by law.</li>
                <h5 className='fw-bold text-center my-4'>Training and Education:</h5>
                <li class="list-group-item py-4">Valuex Digital is committed to providing ongoing training
                  and education to employees to ensure a clear understanding of their responsibilities
                  and the importance of maintaining honesty and accuracy in all interactions.
                  By signing this policy, you acknowledge your understanding of the prohibition against false
                  commitments and misrepresentations and your commitment to upholding Valuex Digital's
                  values of honesty and integrity.</li>
                <h5 className='fw-bold text-center my-4'>Employee Health and Financial Responsibility Policy</h5>
                <p>At Valuex Digital, we value the well-being and success of our employees. However, it's
                  important to clarify that while we are committed to providing a supportive work environment,
                  certain health and financial issues are beyond the direct responsibility of the company. This
                  policy outlines the scope of responsibility in such cases</p>
                <li class="list-group-item py-4"><strong>Employee Health Issues: </strong>While we strive to maintain a healthy and safe workplace,
                  employees are responsible for their personal health and well-being. This includes
                  taking care of their physical and mental health through appropriate medical care,
                  preventive measures, and lifestyle choices.<br /><strong>Financial Issues: </strong>Employees are responsible for managing their personal finances
                  and addressing any financial challenges they may face. Valuex Digital does not bear
                  responsibility for personal financial matters, including debts, loans, investments, or
                  other financial commitments undertaken by employees.<br /><strong>Employee Assistance Programs: </strong>Valuex Digital may offer employee assistance
                  programs, resources, or referrals to external services to support employees in
                  managing health or financial issues. However, the utilization of these resources is
                  voluntary, and the company does not guarantee specific outcomes or resolutions.<br /><strong>Leave and Benefits:  </strong>Employees may be eligible for various leaves and benefits as
                  per company policies, government regulations, and employment agreements. These
                  may include sick leave, medical benefits, and other forms of support. However, it's
                  important to note that not all health or financial issues may be covered under these
                  benefits.<br /><strong>Confidentiality and Privacy: </strong>Valuex Digital is committed to respecting the privacy
                  and confidentiality of employees' personal health and financial matters. Any
                  information shared with the company in the context of seeking support or utilizing
                  employee assistance programs will be treated with utmost confidentiality.<br /><strong>Open Communication:</strong> We encourage open communication between employees
                  and their supervisors or the HR department if they are facing health or financial
                  challenges that may impact their work. While the company may offer guidance or
                  support where appropriate, ultimate responsibility for addressing these challenges
                  rests with the employee.<br />By signing this policy, you acknowledge your understanding that Valuex Digital is not
                  responsible for personal health and financial matters during your tenure and that you
                  are encouraged to take proactive steps to manage and address any such issues.
                </li>
                <h5 className='fw-bold text-center my-4'>Remuneration:</h5>
                <li class="list-group-item py-4">Working period will be counted from 1st of every month to the last
                  date of the month. Salary will be disclosed within 5th of every month based on the
                  Performance. Salary related issues will be resolved between 6 to 9 of every month.
                  Salary will be credited on the 10th of every month. In case the 10th of month is a
                  public holiday then salary will be credited on the next working day. Attendance of 19
                  days is Mandatory each month, Otherwise Company possesses all rights to hold your
                  salary until next month.</li>
                <h5 className='fw-bold text-center my-4'>Performance Expectations:</h5>

                <li class="list-group-item py-4">The Sales Employee agrees to make diligent efforts to
                  achieve and exceed the sales targets set by the Company. The Sales Employee will
                  maintain accurate and timely records of sales activities, leads, and client interactions.</li>
                <h5 className='fw-bold text-center my-4'>Governing Law: </h5>

                <li class="list-group-item py-4">This Agreement shall be governed by and construed in accordance
                  with the laws of Bhopal Jurisdiction, without regard to its conflict of laws principles.</li>
                <h5 className='fw-bold text-center my-4'>Entire Agreement: </h5>

                <li class="list-group-item py-4">This Agreement contains the entire agreement between the
                  parties and supersedes all prior understandings, representations, and agreements
                  between the parties.</li>
              </ul>
            </div>
            <div className="container px-5">
              <h5 className="my-5 px-5">IN WITNESS WHEREOF, the parties hereto have executed this Sales Employee Agreement
                as of the date first above written.</h5>
              <div className="row container mx-auto my-5 pt-5">
                <div className="col-md-6 col-12">
                  <div className="col-md-6 col-12 my-3">
                    <p> <strong>Admin  location :</strong><br /> latitute - {agrData.adminData.location.latitude} , <br /> longitude -{agrData.adminData.location.longitude} </p>
                    <p> <strong>Ip Address :</strong> {agrData.adminData.ip}</p>

                    {isInputVisible ? (
                      <input
                        type="text"
                        name="name"
                        onChange={getAdminData}
                        onBlur={() => handleInputBlur('name')}
                        value={agrData.adminData.name} // Show the input value
                        placeholder="Admin Name"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('name')}>{agrData.adminData.name ? agrData.adminData.name : "Enter  Admin Name  "}</span>
                    )}

                    {/* <input
                      type="text"
                      placeholder="Admin Name"
                      name="adminName"
                      onChange={getData}
                      className="form-control"
                    /> */}

                  </div>
                  <div className="col-md-6 col-12 my-3">

                    {isInputVisible ? (
                      <input
                        type="text"
                        name="email"
                        onChange={getAdminData}
                        onBlur={() => handleInputBlur('email')}
                        value={agrData.adminData.email} // Show the input value
                        placeholder="Admin Email"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('email')}>{agrData.adminData.email ? agrData.adminData.email : "Enter Your Company Email"}</span>
                    )}

                  </div>
                  <div className="col-md-6 col-12 my-3">
                    {isInputVisible ? (
                      <input
                        type="text"
                        name="companyName"
                        onChange={getAdminData}
                        onBlur={() => handleInputBlur('companyName')}
                        value={agrData.adminData.companyName} // Show the input value
                        placeholder="Company Name"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('companyName')}>{agrData.adminData.companyName ? agrData.adminData.companyName : "Enter Your Company Name"}</span>
                    )}

                  </div>
                  <div className="col-md-6 col-12 my-3">
                    {isInputVisible ? (
                      <input
                        type="text"
                        name="number"
                        onChange={getAdminData}
                        onBlur={() => handleInputBlur('number')}
                        value={agrData.adminData.number} // Show the input value
                        placeholder="admin Number"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('number')}>{agrData.adminData.number ? agrData.adminData.number : "Enter Your Number"}</span>
                    )}

                  </div>

                  <div className='d-flex gap-3'>
                    <div className="col-md-5 col-12 my-3 bg-gray-300 ">
                      <label className="p-2">Signature</label>
                      <SignatureCanvas penColor='green'
                        canvasProps={{ width: 230, height: 120, className: 'sigCanvas bg-gray-400 ' }}
                      />

                    </div>
                    {/* <div>
                      <input type="file" name='adminSignature' id="filetag" onChange={adminImageChange} />
                      <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                        <img src={adminImage} style={{ height: "1oo%", width: "100%", objectFit: "cover" }} id="preview" alt="Preview" />

                      </div >*/}
                  </div>
                  <div>
                    <input type="file" name='signature' id="filetag" onChange={adminImgUpload} />
                    <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                      <img src={agrData.adminData.signature} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Preview" />

                    </div >
                  </div>

                </div>
                <div className="col-md-6 col-12">
                  <div className="col-md-6 col-12 my-3">
                    {isInputVisible ? (
                      <input
                        type="text"
                        name="name"
                        onChange={getClientData}
                        onBlur={() => handleInputBlur('name')}
                        value={agrData.clientData.name} // Show the input value
                        placeholder="Client Name"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('name')}>{agrData.clientData.name ? agrData.clientData.name : "Enter Client  Name   "}</span>
                    )}

                    {/* <input
                      type="text"
                      placeholder="Admin Name"
                      name="adminName"
                      onChange={getData}
                      className="form-control"
                    /> */}

                  </div>

                  <div className="col-md-6 col-12 my-3">

                    {isInputVisible ? (
                      <input
                        type="text"
                        name="email"
                        onChange={getClientData}
                        onBlur={() => handleInputBlur('email')}
                        value={agrData.clientData.email} // Show the input value
                        placeholder="Client Email"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('email')}>{agrData.clientData.email ? agrData.clientData.email : "Client Email"}</span>
                    )}

                  </div>
                  <div className="col-md-6 col-12 my-3">
                    {isInputVisible ? (
                      <input
                        type="text"
                        name="companyName"
                        onChange={getClientData}
                        onBlur={() => handleInputBlur('companyName')}
                        value={agrData.clientData.companyName} // Show the input value
                        placeholder="Company Name"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('companyName')}>{agrData.clientData.companyName ? agrData.clientData.companyName : "Enter Your Company Name"}</span>
                    )}

                  </div>
                  <div className="col-md-6 col-12 my-3">
                    {isInputVisible ? (
                      <input
                        type="text"
                        name="number"
                        onChange={getClientData}
                        onBlur={() => handleInputBlur('number')}
                        value={agrData.clientData.number} // Show the input value
                        placeholder="Client Number"
                        className="form-control"
                      />
                    ) : (
                      <span onClick={() => handleInputClick('number')}>{agrData.clientData.number ? agrData.clientData.number : "Enter Your Number"}</span>
                    )}

                  </div>
                  <div className='d-flex'>
                    <div className="col-md-6 col-12 my-3 bg-gray-300 ">
                      <label className="p-2">Signature</label>
                      <SignatureCanvas penColor='green'
                        canvasProps={{ width: 280, height: 120, className: 'sigCanvas bg-gray-400 ' }}
                      />

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="clientSignature" className="form-label">Upload Signature</label>


                    </div>
                    <div>
                      <input type="file" name='signature' id="filetag" onChange={clientImgUpload} />
                      <div className='mt-3' style={{ height: "150px", width: "150px" }}>
                        <img src={agrData.clientData.signature} style={{ height: "100%", width: "100%", objectFit: "cover" }} id="preview" alt="Preview" />

                      </div >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex align-item-center  justify-content-between my-4   mx-auto w-25 '>
              <button className="btn btn-success" type='submit' >Save data</button>

              <EmailShareButton url={url}  >
                <EmailIcon size={40} round={true} />
              </EmailShareButton>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
