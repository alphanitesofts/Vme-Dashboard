import React,{ useState, useEffect } from 'react'
import Baseurl from '../Sourcefiles/url';
import axios from 'axios';
import Infoform from '../Modals/Infoform';

const ReturnOrders = () => {

    const [getPendOrder, setPendOrder] = useState([])
    const [orderID, setOrderID] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [orderDate, setOrderdate] = useState()
    const [loader, setLoader] = useState(false)
    const [shouldShow, setShouldShow] = useState(false)
    const [userID, setUserID] = useState()
    const [warningModal, setWarningModal] = useState(false)

    useEffect(() => {
        getReturnOrders()
    }, [])

    const getReturnOrders = () => {
        setLoader(true)
        const userData = {
            status: "return"
            // payment_status: "deleted",
        }
        axios.post(`${Baseurl}getorder_withstatus`, userData)
            .then(res => {
                setLoader(false)
                setPendOrder(res.data.orders)
            })
            .catch(error => {
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
                <td>Damaged</td>
                <td><button className='btn btn-outline-primary m-1' onClick={() => {
                    oncloseModal()
                    setUserID(items)
                }}>Info</button>
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
                                        <h1 className="m-0">Return Orders</h1>
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
                                                                <h4 className='text-center'>No data availabe</h4> :
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

export default ReturnOrders