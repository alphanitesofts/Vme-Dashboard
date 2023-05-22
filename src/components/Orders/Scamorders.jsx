import React from 'react'
import { Link } from 'react-router-dom'
import { AsyncStorage } from 'AsyncStorage'
import axios from 'axios'
import { useState } from 'react'
import Baseurl from '../Sourcefiles/url'
import { useEffect } from 'react'
import Infoform from '../Modals/Infoform';


const Scamorders = () => {

  const [scamOrders, setScamOrders] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()


  const scamData = () => {
    setLoader(true)
    const pendObj = {
      order_status: "scam_orders",
    }

    axios.post(`${Baseurl}getinfo`, pendObj)
      .then(res => {
        setLoader(false)
        setScamOrders(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    console.log(scamOrders)
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
      </tr>
    )
  }


  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

  const DataRender = () => {

    if (!orderID && !phoneNo & !orderDate) {
      return (
        scamOrders.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && !phoneNo && !orderDate) {
      return (
        scamOrders.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo && !orderID && !orderDate) {
      return (
        scamOrders.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate && !orderID && !phoneNo) {
      return (
        scamOrders.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo && !orderDate) {
      return (
        scamOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate && !orderID) {
      return (
        scamOrders.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && !orderDate) {
      return (
        scamOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        scamOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
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



  useEffect(() => { scamData() }, [])

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
                    <h1 className="m-0">Scam Orders</h1>
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
                            </tr>
                          </thead>
                          <tbody >
                            {
                              scamOrders.lenght < 0 ?
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

export default Scamorders