import React from 'react';
import 'moment-timezone';
import axios from 'axios';
import Moment from 'react-moment';
import { AsyncStorage } from 'AsyncStorage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Baseurl from '../url';
import Infoform from './Infoform';

const Completedorders = () => {

  const [completedOrders, setCompletedOrders] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()
  const [loader, setLoader] = useState(false)

  const CompletedData = () => {
    setLoader(true)
    const pendObj = {
      order_status: "completed",
      payment_status: "paid",
    }

    axios.post(`${Baseurl}getinfo`, pendObj)
      .then(res => {
        setLoader(false)
        setCompletedOrders(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    console.log(completedOrders)
  }

  // const sendCompletedOrders = (id) => {

  //   const pendingobj = {
  //     order_status: "completed",
  //     payment_status: "paid",
  //     ready_to_review: 1
  //   }
  //   axios.post(`${Baseurl}updatedata/${id}`, pendingobj)
  //     .then((res) => {
  //       toast.info("order Completed")
  //       console.log(res.data)
  //     })
  //     .catch((error => {
  //       console.log(error)
  //     }))
  // }

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
          <button className='btn btn-outline-primary m-1' >Delievered</button>
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
        completedOrders.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        completedOrders.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        completedOrders.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        completedOrders.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        completedOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        completedOrders.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        completedOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        completedOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
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
    CompletedData()
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
                    <h1 className="m-0">Completed Orders</h1>
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
                              completedOrders.lenght < 1 ?
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

export default Completedorders