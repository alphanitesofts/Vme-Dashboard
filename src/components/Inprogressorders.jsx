import React from 'react';
import 'moment-timezone';
import axios from 'axios';
import Moment from 'react-moment';
import { AsyncStorage } from 'AsyncStorage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Baseurl from '../url';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Infoform from './Infoform';
import Modal from 'react-modal'



const Inprogressorders = () => {

  const [getProgressOrder, setProgressOrder] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()
  const [warningModal, setWarningModal] = useState(false)
  const [roleID, setoleID] = useState()

  const progressOrders = () => {
    setLoader(true)
    const pendObj = {
      order_status: "in_progress",
    }
    axios.post(`${Baseurl}getinfo`, pendObj)
      .then((res) => {
        setLoader(false)
        setProgressOrder(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const sendToInprogress = (id) => {
    const pendingObj = {
      order_status: "under_making",
      payment_status: "unpaid",
      ready_to_review: 1
    }
    axios.post(`${Baseurl}updatedata/${id}`, pendingObj)
      .then((res) => {
        toast.success('Order Sended to Under Making Table')
        progressOrders()
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deletedOrders = (id) => {
    const pendingObj = {
      order_status: "deleted",
      payment_status: "deleted",
      ready_to_review: 0
    }

    axios.post(`${Baseurl}updatedata/${id}`, pendingObj)
      .then((res) => {
        progressOrders()
        setWarningModal(false)
        toast.warning('Order Sended to deleted Table')
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

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

  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.name}</td>
        <td>{items.address}</td>
        <td>{items.phone}</td>
        <td>{items.ldate}</td>
        <td><button className='btn btn-outline-primary m-1' onClick={() => {
          oncloseModal()
          setUserID(items)
        }}>Info</button></td>
        <td>
          <button onClick={() => sendToInprogress(items.id)} className='btn btn-outline-primary btn-sm'>Under-Making</button>&nbsp;&nbsp;
          {roleID === "3" ? console.log('Some fields are missing') :
            <button className='btn btn-outline-danger m-1' onClick={() => {
              setWarningModal(true)
              setUserID(items.id)
            }}><i className="fa-solid fa-xmark"></i></button>
          }
        </td>
      </tr>
    )
  }

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

  const DataRender = () => {

    if (!orderID && !phoneNo & !orderDate) {
      return (
        getProgressOrder.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        getProgressOrder.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        getProgressOrder.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        getProgressOrder.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        getProgressOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        getProgressOrder.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        getProgressOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        getProgressOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
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

  useEffect(() => {
    progressOrders()
  }, [])

  return (
    <div>
      <Modal
        isOpen={warningModal}
        contentLabel="Example Modal"
      >
        <div className='content-wrapper' >
          <div className="modalBackground" >
            <div className="modalContainer" >
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    setWarningModal(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="title">
                <h1>Are You Sure You Want to Delete this order?</h1>
              </div>
              <div className="footer">
                <button
                  onClick={() => {
                    setWarningModal(false);
                  }}
                  id="cancelBtn"
                >
                  Cancel
                </button>
                <button onClick={() => deletedOrders(userID)}>Continue </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {loader === true ?
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
                  <h1 className="m-0">In Progress Orders </h1>
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
                      <table id="example2" className="table table-bordered table-hover">
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
                            getProgressOrder.length < 1 ?
                              <h4>No Data Available</h4> :
                              <DataRender />
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

export default Inprogressorders