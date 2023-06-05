import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'moment-timezone';
import Moment from 'react-moment';
import Baseurl from '../Sourcefiles/url'
import InfoItem from '../Modals/InfoItem';

const GetAllItems = () => {

    const [getItems, setGetItems] = useState([])
    const [loader, setLoader] = useState(false)
    const [userID, setUserID] = useState()
    const [shouldShow, setShouldShow] = useState(false)
    const [images, setImage] = useState()

    const showData = () => {
        setLoader(true)
        axios.post(`${Baseurl}getallproducts`)
            .then(res => {
                setGetItems(res.data.Data)
                setImage(res.data.Data.item_images)
                console.log(res)
                setLoader(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function convertBase64ToImage(base64Data) {
        const image = new Image();
        image.src = base64Data;
        return image;
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    useEffect(() => {
        showData()
    }, [])


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
                                                <th>Image</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody >
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
                                                        const imageElement = convertBase64ToImage(items.item_images);

                                                        const image = items.item_images[0];
                                                        const colors = items.item_colour.split(",");

                                                        return (
                                                            <tr>
                                                                <td>{items.category_id}</td>
                                                                <td>{items.category_name}</td>
                                                                <td>{items.item_price}</td>
                                                                <td><button className='round-circle' style={{ backgroundColor: items.item_colour }}></button></td>

                                                                {/* <td>
                                                                    {
                                                                        <div className="d-flex">
                                                                            {JSON.parse(items.item_colour).map((color) => (
                                                                                <div
                                                                                    className="round-circle mx-1"
                                                                                    style={{ backgroundColor: color.item_colour }}
                                                                                ></div>
                                                                            ))}
                                                                        </div>
                                                                    }
                                                                </td> */}


                                                                {/* {colorss.map((color) => (
                                                                                <div>

                                                                                    <button
                                                                                        key={color}
                                                                                        style={{ backgroundColor: color }}
                                                                                    >
                                                                                        {color}
                                                                                    </button>

                                                                                </div>
                                                                            ))} */}

                                                                {/* <td><img src={`${items.item_images}`} alt="" /></td> */}
                                                                <td><img src={images} alt="" /></td>
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