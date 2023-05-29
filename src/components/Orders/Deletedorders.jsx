import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Baseurl from '../Sourcefiles/url';
import Infoform from '../Modals/Infoform';

const Deletedorders = () => {
  const [delOrders, setDelOrders] = useState([])
  const [orderID, setOrderID] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [orderDate, setOrderdate] = useState()
  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [userID, setUserID] = useState()

  useEffect(() => {
    recieveData()
  }, [])

  const recieveData = () => {
    setLoader(true)
    const userData = {
      status: "deleted"
      // payment_status: "deleted",
    }
    axios.post(`${Baseurl}getorder_withstatus`, userData)
      .then(res => {
        setLoader(false)
        setDelOrders(res.data.orders)
      })
      .catch(error => {
        console.log(error)
      })
    console.log(delOrders)

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
      </tr>
    )
  }

  const DataRender = () => {
    if (!orderID && !phoneNo & !orderDate) {
      return (
        delOrders.map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID) {
      return (
        delOrders.filter((objects) => objects.id === Number(orderID)).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (phoneNo) {
      return (
        delOrders.filter((objects) => objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderDate) {
      return (
        delOrders.filter((objects) => objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        )
      )
    }
    else if (orderID && phoneNo) {
      return (
        delOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (phoneNo && orderDate) {
      return (
        delOrders.filter((objects) => objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo) {
      return (
        delOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo).map((items) => {
          return (
            <Content items={items} />
          )
        }
        ))
    }
    else if (orderID && phoneNo && orderDate) {
      return (
        delOrders.filter((objects) => objects.id === Number(orderID) && objects.phone === phoneNo && objects.ldate === orderDate).map((items) => {
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

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

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
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Deleted Orders</h1>
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
                          <input className="form-control" type="number" placeholder="Search with order ID" onChange={(e) => { setOrderID(e.target.value) }} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="text" placeholder="Search with Phone" onChange={(e) => setPhoneNo(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                          <input className="form-control" type="number" placeholder="Enter date in YYYY-MM-DD" onChange={(e) => setOrderdate(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />
                        </div>
                        <table id="example2" className="table table-bordered table-hover ">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Address</th>
                              <th>Phone No.</th>
                              <th>Quantity</th>
                              <th>Date</th>
                              <th>Info</th>
                            </tr>
                          </thead>
                          <tbody >
                            {
                              delOrders.lenght < 1 ?
                                <h4>No data Available</h4> :
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
                : null}
          </div>
      }
    </div>
  )
}

export default Deletedorders