import React from 'react';
import { useState, useEffect } from 'react';
import 'moment-timezone';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Baseurl from '../Sourcefiles/url';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Infoform from '../Modals/Infoform';
import Modal from 'react-modal'



toast.configure()
const Undermakingorders = () => {

  const [underMaking, setUnderMaking] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()
  const [warningModal, setWarningModal] = useState(false)
  const [roleID, setoleID] = useState()

  const showData = () => {

    setLoader(true)
    const orderObj = {
      status: "under_making"
    }

    axios.post(`${Baseurl}getorder_withstatus`, orderObj)
    .then((res) => {
      setLoader(false)
      setUnderMaking(res.data.orders)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const sendtoUndermaking = (id) => {
    const pendingobj = {
      status: "enroute",
      // payment_status: "unpaid",
    }
    axios.post(`${Baseurl}update_orderstatus/${id}`, pendingobj)
      .then((res) => {
        toast.success('Order Sended to enroute Table')
        showData()
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deletedOrders = (id) => {
    const pendingobj = {
      status: "deleted",
      // payment_status: "unpaid",
    }
    axios.post(`${Baseurl}update_orderstatus/${id}`, pendingobj)
      .then((res) => {
        toast.success('Order Sended to deleted Table')
        showData()
        console.log(res.data)
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
          <button onClick={() => sendtoUndermaking(items.id)} className='btn btn-outline-primary m-1'>Enroute</button>&nbsp;&nbsp;
          {
            roleID === "2" || roleID === "0" || roleID === "3" ?
              <button className='btn btn-outline-danger m-1' onClick={() => {
                setWarningModal(true)
                setUserID(items.id)
              }}>
                <i className="fa-solid fa-xmark"></i></button>
              :
              console.log("somefields are missing")
          }
        </td>
      </tr>
    )
  }


  // Importing RoleID from Async Storage to apply admin employe conditions
  const SetLocalLogin = async () => {
    try {
      let roleID = await localStorage.getItem('roleID');
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


  useEffect(() => {
    showData()
  }, [])



  const DataRender = () => {

    if (!orderID && !phoneNo & !orderDate) {
      return (
        underMaking.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        underMaking.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        underMaking.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        underMaking.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        underMaking.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        underMaking.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        underMaking.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        underMaking.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
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
                    <h1 className="m-0">Undermaking orders</h1>
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
                            <th>Order ID</th>
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
                              underMaking.length < 1 ?
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

export default Undermakingorders