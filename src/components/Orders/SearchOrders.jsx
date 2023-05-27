
import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Baseurl from '../Sourcefiles/url';
import axios from 'axios';
import Infoform from '../Modals/Infoform';

const SearchOrders = () => {
    // search filters
    const [phoneNo, setPhoneNo] = useState()
    const [orderDate, setOrderdate] = useState()
    // screenLoader
    const [loader, setLoader] = useState(false)
    // Info Modal
    const [userID, setUserID] = useState()
    const [shouldShow, setShouldShow] = useState(false)
    const [searchOrder, setSearchOrder] = useState([])

    const searchViaOrder = () => {
        if (phoneNo === "") {
            toast.warn('Please add a phone number')
        }
        else {
            setLoader(true)
            axios.post(`${Baseurl}fetch_orders_by_phone/${phoneNo}`)
                .then((res) => {
                    setLoader(false)
                    console.log(res.data.orders)
                    setSearchOrder(res.data.orders)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const searchhViaDate = () => {
        if (orderDate === "") {
            toast.warn('Please add a date')
        }
        else {
            setLoader(true)
            const userObj = {
                Idate: orderDate,
            }
            axios.post(`${Baseurl}fetchorders_withdate`, userObj)
                .then((res) => {
                    setLoader(false)
                    if (res.data.status === 200) {
                        console.log(res.data.orders)
                        setSearchOrder(res.data.orders)
                    }
                    else {
                        toast.warn('No Data Found')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }


    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h4 className="m-0">Search in all orders</h4>
                            </div>{/* /.col */}

                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title"><b>All Orders</b></h3>
                                    </div>

                                    <div className="card-body table-responsive">
                                        <div className="form-group row" >
                                            <div className='col-lg-6'>
                                                <input className="form-control" type="text" placeholder="Search with Phone" onChange={(e) => setPhoneNo(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />
                                                <button className='btn btn-sm btn-outline-primary mt-1 mb-2' onClick={searchViaOrder} style={{ borderRadius: "10em" }}><i className='fa-solid fa-magnifying-glass' /> &nbsp; Search Via Phone Number</button>
                                            </div>
                                            <div className='col-lg-6'>
                                                <input className="form-control" type="text" placeholder="Enter date in YYYY-MM-DD" onChange={(e) => setOrderdate(e.target.value)} aria-label="Search" style={{ borderRadius: "10em" }} />
                                                <button className='btn btn-sm btn-outline-primary mt-1' onClick={searchhViaDate} style={{ borderRadius: "10em" }}><i className='fa-solid fa-magnifying-glass' />&nbsp; Search Via Date</button>
                                            </div>
                                        </div>
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

                                                <table id="example2" className="table table-bordered table-hover  ">
                                                    <thead>
                                                        <tr>
                                                            {/* <th>Sr. No.</th>  */}
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
                                                            searchOrder.map((items) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{items.user_id}</td>
                                                                            <td>{items.address}</td>
                                                                            <td>{items.contact_address}</td>
                                                                            <td>{items.quantity}</td>
                                                                            <td>{items.Idate}</td>
                                                                            <td><button className='btn btn-outline-primary m-1' onClick={() => {
                                                                                oncloseModal()
                                                                                setUserID(items)
                                                                            }}>Info</button></td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                        }

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

        </div>
    )
}



export default SearchOrders