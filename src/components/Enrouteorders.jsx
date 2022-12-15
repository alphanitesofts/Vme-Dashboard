import React from 'react';
import axios from 'axios';
import { AsyncStorage } from 'AsyncStorage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Baseurl from '../url';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Infoform from './Infoform';


const Enrouteorders = () => {
  const [enrouteData, setEnrouteData] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()

  const recieveData = () => {
    setLoader(true)
    const userObj = {
      order_status: "enroute"
    }

    axios.post(`${Baseurl}getinfo`, userObj)
      .then(res => {
        setLoader(false)
        setEnrouteData(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  const sendToCompleted = (id) => {
    const statusInfo = {
      order_status: "completed",
      payment_status: "paid",
      ready_to_review: 1
    }

    axios.post(`${Baseurl}updatedata/${id}`, statusInfo)
      .then((res) => {
        console.log(res.data)
        toast.success("Order Sended to Completed Table")
        recieveData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const returnOrders = (id) => {

    const pendingObj = {
      order_status: "return",
      payment_status: "return",
      ready_to_review: 0
    }

    axios.post(`${Baseurl}updatedata/${id}`, pendingObj)
      .then((res) => {
        recieveData()
        toast.warning('Order sended to return table')
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const scamOrders = (id) => {
    const obj = {
      order_status: "scam_orders",
      payment_status: "scam_orders",
      ready_to_review: 0
    }
    axios.post(`${Baseurl}updatedata/${id}`, obj)
      .then(res => {
        recieveData()
        toast.warning('order sended to Scam Orders')
      })
      .catch((error) => {
        alert('!function')
        console.log(error)
      })
  }

  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.name}</td>
        <td>{items.address}</td>
        <td>{items.phone_number}</td>
        <td>{items.Idate}</td>
        <td><button className='btn btn-outline-primary m-1' onClick={() => {
          oncloseModal()
          setUserID(items)
        }}>Info</button></td>
        <td>
          <button className='btn btn-outline-primary m-1' onClick={() => sendToCompleted(items.id)}>Deleivered</button>
          <button className='btn btn-outline-secondary m-1' onClick={() => returnOrders(items.id)}>Return</button>
          {
            roleID === "2" || roleID === "0" ?
              <button className='btn btn-outline-danger m-1' onClick={() => scamOrders(items.id)}>Scam</button>
              :
              console.log("Some Fields are missing")
          }
        </td>
      </tr>
    )
  }
  // Importing RoleID from Async Storage to apply admin employe conditions
  const [roleID, setoleID] = useState()
  const SetLocalLogin = async () => {
    try {
      let roleID = await AsyncStorage.getItem('roleID');
      if (roleID !== null) {
        setoleID(roleID)
      }
    } catch {
      return null;
    }
    console.log(roleID)
  }
  useEffect(() => { SetLocalLogin() }, [])

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

  const DataRender = () => {

    if (!orderID && !phoneNo & !orderDate) {
      return (
        enrouteData.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        enrouteData.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        enrouteData.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        enrouteData.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        enrouteData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        enrouteData.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        enrouteData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        enrouteData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else
      return (
        <>
          <th>
            <p>No data available</p>
          </th>
        </>
      )

  }

  const loadingSection = () => {
    if (enrouteData.length === 0) {
      return <h4 className='text-center'>No Data Available</h4>
    }
    else {
      return <DataRender />
    }
  }

  useEffect(() => {
    recieveData()
  }, [])



  return (
    <div>
      {
        loader === true ?
          <>
            <div className='content-wrapper'>
              <div className="loader">
                <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </> :
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Enroute Orders</h1>
                  </div>{/* /.col */}


                </div>{/* /.row */}
              </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body table-responsive">
                        <div className="form-group d-flex" >
                          <input className="form-control" type="number" placeholder="Search with order ID" onChange={(e) => { setOrderID(e.target.value) }} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" placeholder="Search with Phone" onChange={(e) => setPhoneNo(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="number" placeholder="Enter date in YYYY-MM-DD" onChange={(e) => setOrderdate(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />
                        </div>
                        <table id="example2" className="table table-bordered table-hover ">
                          <thead>
                            <tr>

                              <th>Orders ID</th>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Phone No.</th>
                              <th>Date</th>
                              <th>Info</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody >
                            {
                              loadingSection()
                            }
                          </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </section>
            {
              userID ?
                <Infoform
                  shouldShow={shouldShow}
                  closeModal={oncloseModal}
                  userData={userID}
                />
                : null}
            {/* /.content */}
          </div>
      }
    </div>
  )
}

export default Enrouteorders