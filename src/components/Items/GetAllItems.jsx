import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'moment-timezone';
import Moment from 'react-moment';
import Baseurl from '../Sourcefiles/url'
import InfoItem from '../Modals/InfoItem';
import baseUrlforImages from '../Sourcefiles/baseUrlforImages';

const GetAllItems = () => {

    const [getItems, setGetItems] = useState([])
    const [loader, setLoader] = useState(false)
    const [userID, setUserID] = useState()
    const [shouldShow, setShouldShow] = useState(false)
    const [picture2, setPicture2] = useState('')

    useEffect(() => {
        showData()
    }, [])

    const showData = () => {
        setLoader(true)
        axios.post(`${Baseurl}getallproducts`)
            .then((res) => {
                console.log(res);
                setGetItems(res.data.Data);
                setLoader(false);
                setPicture2(res.data.Data[0].image_2)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Available Items</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body table-responsive">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Category ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Color</th>
                                                <th>Primary Image</th>
                                                {
                                                    picture2 ?
                                                        <th>Secondary Image</th> : null
                                                }
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                    getItems.sort((a, b) => new Date(...b.created_at.split("/").reverse()) - new Date(...a.created_at.split("/").reverse())).map((items) => {
                                                        return (

                                                            <tr>
                                                                <td>{items.category_id}</td>
                                                                <td>{items.category_name}</td>
                                                                <td>{items.item_price}</td>
                                                                <td>
                                                                    {items.item_colour.map((color) => (
                                                                        <button
                                                                            key={color}
                                                                            className="round-circle me-1"
                                                                            style={{ backgroundColor: color }}
                                                                        ></button>
                                                                    ))}
                                                                </td>
                                                                <td>
                                                                    <img src={`${baseUrlforImages}${items.image_1}`} alt="product-img" style={{ maxWidth: '100px' }} onClick={() =>
                                                                        window.open(`${baseUrlforImages}${items.image_1}`, "_blank")
                                                                    } />
                                                                </td>

                                                                {
                                                                    items.image_2 ?

                                                                        <td>
                                                                            <img src={`${baseUrlforImages}${items.image_2}`} alt="product-img" style={{ maxWidth: '100px' }} onClick={() =>
                                                                                window.open(`${baseUrlforImages}${items.image_2}`, "_blank")
                                                                            } />
                                                                        </td>

                                                                        : null
                                                                }

                                                                <td><Moment format='DD/MM/YYYY' >{items.created_at}</Moment></td>
                                                                <td>
                                                                    <button className='btn btn-outline-primary m-1' onClick={() => {
                                                                        oncloseModal()
                                                                        setUserID(items)
                                                                    }}>View</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    userID ?
                        <InfoItem
                            shouldShow={shouldShow}
                            closeModal={oncloseModal}
                            userData={userID}
                        />
                        : null}
            </section>
        </div>
    )
}

export default GetAllItems