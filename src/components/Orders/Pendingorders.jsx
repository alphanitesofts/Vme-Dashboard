import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Baseurl from '../Sourcefiles/url';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Infoform from '../Modals/Infoform';
import Modal from 'react-modal'

const Pendingorders = () => {

  const [getPendOrder, setPendOrder] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()
  const [warningModal, setWarningModal] = useState(false)

  useEffect(() => {
    getPendingOrders()
  }, [])

  const getPendingOrders = () => {
    setLoader(true)
    const pendObj = {
      status: "pending"
    }
    axios.post(`${Baseurl}getorder_withstatus`, pendObj)
      .then((res) => {
        setLoader(false)
        setPendOrder(res.data.orders)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const sendToInprogress = (id) => {
    const pendingObj = {
      status: "in_progress"
      // payment_status: "unpaid",
    }

    axios.post(`${Baseurl}update_orderstatus/${id}`, pendingObj)
      .then((res) => {
        toast.success('Order Sended to Inprogress Table')
        getPendingOrders()
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deletedOrders = (id) => {
    const pendingObj = {
      status: "deleted"
    }

    axios.post(`${Baseurl}update_orderstatus/${id}`, pendingObj)
      .then((res) => {
        toast.success('Order Sended to deleted Table')
        getPendingOrders()
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const Content = ({ items }) => {
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
          <button className='btn btn-outline-primary m-1' onClick={() => sendToInprogress(items.id)}>
            Let's Start
          </button>&nbsp;&nbsp;
          <button className='btn btn-outline-danger m-1' onClick={() => {
            setWarningModal(true)
            setUserID(items.id)
          }}><i className="fa-solid fa-xmark"></i></button>
        </td>
      </tr>
    )
  }

  const DataRender = () => {

    if (!orderID && !phoneNo & !orderDate) {
      return (
        getPendOrder.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        getPendOrder.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        getPendOrder.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        getPendOrder.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        getPendOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        getPendOrder.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        getPendOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        getPendOrder.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else
      return (
        <>
          <tb>
            <p>No data available</p>
          </tb>
        </>
      )

  }

  function oncloseModal() {
    setShouldShow((prev) => !prev)
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
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Pending Orders</h1>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                      </div>
                      <div className="card-body table-responsive">
                        <div className="form-group d-flex" >
                          <input className="form-control" type="number" onChange={(e) => { setOrderID(e.target.value) }} placeholder="Search with order ID" aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" onChange={(e) => setPhoneNo(e.target.value)} placeholder="Search with Name" aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" onChange={(e) => setOrderdate(e.target.value)} placeholder="Enter date in YYYY-MM-DD" aria-label="Search" style={{ borderRadius: "10em" }} />
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
                              getPendOrder.length < 1 ?
                                <tbody className='text-center'>No data available</tbody> :
                                <DataRender />
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
                : null
            }
          </div>

      }
    </div>
  )
}

export default Pendingorders