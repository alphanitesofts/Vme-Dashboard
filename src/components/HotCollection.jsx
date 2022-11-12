import React, { useState } from 'react';
import 'moment-timezone';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import 'moment-timezone';
import Baseurl from '../url';
import axios from 'axios';

toast.configure()

const HotCollection = () => {
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [type, setType] = useState('Card')
    const [price, setPrice] = useState('')
    const [fieldStatus, setFieldStatus] = useState(false)

    // javascript fetch
    const sendData = () => {
        setFieldStatus(true)

        if (!name || !picture || !price || !type) {
            toast.warning("Please fill all fields")
        }
        else {
            const userObj = {
                item_name: name,
                item_type: type,
                item_price: price,
                item_pic: (picture, "[PROXY]")
            }
            axios.post(`${Baseurl}post_collection`, userObj)
                .then((res) => {
                    console.log(res)
                    toast.info('Item added successfully')
                    setInterval(() => {
                        window.location.reload()
                    }, 1500);
                })
                .catch((err) => {
                    console.log(err)
                    toast.warn('Error while adding item')
                })

            // var formdata = new FormData();
            // formdata.append("item_name", name);
            // formdata.append("item_type", type);
            // formdata.append("item_price", price);
            // formdata.append("item_pic", picture, "[PROXY]");

            // var requestOptions = {
            //     method: 'POST',
            //     body: formdata,
            //     redirect: 'follow'
            // };
            // fetch(`${Baseurl}post_collection`, requestOptions)

            //     .then(response => response.text())
            //     .then(result => {
            //         console.log(result)
            //         toast.warning("Item added successfully")
            //     })
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error).toast.error("Error while submitting data"));

            // setInterval(() => {
            //     window.location.reload(true)
            // }, 2000)
        }
    }


    return (
        <div>
            <div className='content-wrapper '>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Add Item to the Hot collection</h1>
                            </div>{/* /.col */}

                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <div className="container pt-3">
                    <div className='container'>
                        <div className="card card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">Add Item:</h3>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputEmail1">Item Name</label>
                                        <input style={{ borderColor: name === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter product name" />
                                        <p >{name === "" && fieldStatus === true ? <span className='text-danger'> Please Add name for the item</span> : ''}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputFile">Item Picture</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input onChange={(e) => setPicture(e.target.files[0])} type="file" className="custom-file-input" id="exampleInputFile" />
                                                <label style={{ borderColor: picture === "" && fieldStatus === true ? "red" : '#ced4da' }} className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                            </div>
                                        </div>
                                        <p >{picture === "" && fieldStatus === true ? <span className='text-danger'> Please Add picture for the item</span> : ''}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">Item Type</label>
                                        <select style={{ borderColor: "#ced4da" }} onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option >Card</option>
                                            <option >Tattos</option>
                                            <option >Jewellery</option>
                                            <option >Other</option>
                                        </select>

                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">Items left</label>
                                        <input style={{ borderColor: price === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Item Price as given" />
                                        <p >{price === "" && fieldStatus === true ? <span className='text-danger'> Please Add price for the item</span> : ''}</p>

                                    </div>
                                </div>

                            </div>
                            <div className="card-footer">
                                <button type="submit" onClick={sendData} className="btn btn-outline-secondary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotCollection