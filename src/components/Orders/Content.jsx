import React from 'react';

import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Baseurl from '../Sourcefiles/url';
import axios from 'axios';
import Infoform from '../Modals/Infoform';
import Modal from 'react-modal'

toast.configure()
const Content = () => {

  const [userData, setUserData] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  // loadingOnTickButton
  const [loading, setLoading] = useState(false)
  // screenLoader
  const [loader, setLoader] = useState(false)
  // Info Modal
  const [userID, setUserID] = useState()
  const [shouldShow, setShouldShow] = useState(false)
  // Warning Model
  const [warningModal, setWarningModal] = useState(false)

  const recieveData = () => {
    setLoader(true)
    axios.get(`${Baseurl}fetch_all_orders`)
      .then((res) => {
        setLoader(false)
        console.log(res.data.Orders)
        setUserData(res.data.Orders)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const sendToPending = (id) => {
    setLoading(true)
    const pendingObj = {
      order_status: "pending",
      payment_status: "unpaid",
    }
    axios.post(`${Baseurl}updatedata/${id}`, pendingObj)
      .then((res) => {
        console.log(res.data)
        recieveData()
        setLoading(false)
        toast.success("Order Sended to Pending Table")
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
        console.log(res.data)
        setWarningModal(false)
        toast.warning('Order Sended to deleted Table')
        recieveData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.address}</td>
        <td>{items.contact_address}</td>
        <td>{items.quantity}</td>
        <td>{items.Idate}</td>
        <td><button className='btn btn-outline-primary m-1' onClick={() => {
          oncloseModal()
          setUserID(items)
        }}>Info</button></td>
        <td>
          <button className='btn btn-outline-success m-1' onClick={() => sendToPending(items.id)}>
            {
              loading === true ? "Loading..." :
                <i className="fa-solid fa-check"></i>
            }
          </button>
          <button className='btn btn-outline-danger m-1' onClick={() => {
            setWarningModal(true)
            setUserID(items.id)
          }}><i className="fa-solid fa-xmark"></i></button>
        </td>
      </tr>
    )
  }

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }
  // filters condition
  const DataRender = () => {
    if (!orderID && !phoneNo & !orderDate) {
      return (
        userData.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && !phoneNo && !orderDate) {
      return (
        userData.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo && !orderID && !orderDate) {
      return (
        userData.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate && !orderID && !phoneNo) {
      return (
        userData.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo && !orderDate) {
      return (
        userData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate && !orderID) {
      return (
        userData.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && !orderDate) {
      return (
        userData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        userData.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else {
      <p>no data</p>
    }

  }

  //Output for Data for Tables
  const loadingSection = () => {
    if (userData.length < 1) {
      return <h4 className='text-center'>No Data Available</h4>
    }
    else {
      return <DataRender />
    }
  }

  useEffect(() => {
    recieveData()
  }, [])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const time = `${current.getHours()}:${current.getMinutes()}`

  return (
    <div>
      {/* Warning Modal */}
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
      {/* End of warning Modal */}
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
          </>
          :
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h4 className="m-0"><i class="fa-thin fa-clock-desk"></i>&nbsp;{time} {date}</h4>
                  </div>{/* /.col */}

                </div>
              </div>
            </div>
            {/* /.content-header */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title"><b>All Orders</b></h3>
                      </div>

                      <div className="card-body table-responsive">
                        <div className="form-group d-flex" >
                          <input className="form-control" type="number" placeholder="Search with order ID" onChange={(e) => { setOrderID(e.target.value) }} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" placeholder="Search with Phone" onChange={(e) => setPhoneNo(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" placeholder="Enter date in YYYY-MM-DD" onChange={(e) => setOrderdate(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />
                        </div>
                        <table id="example2" className="table table-bordered table-hover  ">
                          <thead>
                            <tr>
                              {/* <th>Sr. No.</th>  */}
                              <th>User ID</th>
                              <th>Address</th>
                              <th>Phone No.</th>
                              <th>Quantity</th>
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

              </div>

            </section>
            {
              userID ?
                <Infoform
                  shouldShow={shouldShow}
                  closeModal={oncloseModal}
                  userData={userID}
                />
                : null}
          </div>
      }
    </div>
  )
}

export default Content
