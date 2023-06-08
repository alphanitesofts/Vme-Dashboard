import React, { useState, useEffect } from 'react';
import 'moment-timezone';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import 'moment-timezone';
import Baseurl from '../Sourcefiles/url';
import axios from 'axios';


toast.configure()
const Additemform = () => {

    const [data, setData] = useState([])
    const [productId, setProductId] = useState("Select any Category")

    // products
    const [actualPrice, setActualPrice] = useState('')
    const [previousPrice, setPreviousPrice] = useState('')
    const [productDes, setProductDesc] = useState('')
    const [colors, setColors] = useState([]);
    const [available, setAvailable] = useState("true")
    const [hot, setHot] = useState("false")
    const [fieldStatus, setFieldStatus] = useState(false)
    const [pictureOne, setPictureOne] = useState('')
    const [pictureTwo, setPictureTwo] = useState('')

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = () => {
        axios.get(`${Baseurl}fetchAllcategory`)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const setColor = (color) => {
        if (colors.includes(color)) {
            setColors(colors.filter((c) => c !== color));
        } else {
            setColors([...colors, color]);
        }
    };

    // add product
    const addProduct = () => {
        setFieldStatus(true);
        if (!actualPrice || !previousPrice || !productDes || !productId || !colors) {
            toast.warning("Please fill in all fields");
        } else {
            var formdata = new FormData();
            formdata.append("item_price", previousPrice);
            formdata.append("actual_price", actualPrice);
            formdata.append("item_colour", colors);
            formdata.append("description", productDes);
            formdata.append("is_hot", hot);
            formdata.append("category_id", productId);
            formdata.append("availability", available);
            formdata.append("image_1", pictureOne, "[PROXY]");
            formdata.append("image_2", pictureTwo, "[PROXY]");

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${Baseurl}Addproducts`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "200") {
                        toast.success("Product added successfully")
                    }
                    else if (result.status === "401") {
                        toast.error("Something went wrong")
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    toast.warn('Oppss... something went wrong')
                });
        }
    };

    return (
        <div className='content-wrapper '>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add New Inventory Item</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-3">
                <div className='container'>
                    <div className="card card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">Add Product:</h3>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='form-group col-12'>
                                    <label htmlFor="exampleInputFile">Category</label>
                                    <select onChange={(e) => setProductId(e.target.value)} className="form-select" style={{ borderColor: productId === "Select any Category" && fieldStatus === true ? "red" : '#ced4da' }} aria-label="Default select example">
                                        <option value={"Select any Category"}>Select any Category</option>
                                        {
                                            data.map((items) => {
                                                return (
                                                    <>
                                                        <option value={items.id}>{items.category_name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputFile">Item Picture</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input onChange={(e) => setPictureOne(e.target.files[0])} className="form-control" style={{ borderColor: pictureOne === "" && fieldStatus === true ? "red" : '#ced4da' }} type="file" />
                                        </div>
                                    </div>
                                    {/* <p className='mt-0 mb-0'>{baseImage === "" && fieldStatus === true ? <span className='text-danger'> Please Add picture for the item</span> : null}</p> */}
                                </div>

                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputFile">Item Picture</label>
                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input onChange={(e) => setPictureTwo(e.target.files[0])} className="form-control" type="file" />
                                        </div>
                                    </div>
                                    {/* <p className='mt-0 mb-0'>{baseImage === "" && fieldStatus === true ? <span className='text-danger'> Please Add picture for the item</span> : null}</p> */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">Actual Price</label>
                                    <input value={actualPrice} style={{ borderColor: actualPrice === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setActualPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Item Price as given" />
                                </div>

                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">Previous Price</label>
                                    <input style={{ borderColor: previousPrice === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setPreviousPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Item Price as given" />

                                </div>

                                <div className="col-12 pb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Description:</b></label>
                                    <textarea className="form-control" style={{ borderColor: productDes === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setProductDesc(e.target.value)} id="exampleFormControlTextarea1" rows={5} placeholder="Write short describtion about the product ..." />
                                </div>

                                <div className="form-check col-6">
                                    <label >Hot Collection</label>
                                    <select style={{ borderColor: "#ced4da" }} onChange={(e) => setHot(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option value={"false"} >Normal Product</option>
                                        <option value={"true"}>Hot Product</option>
                                    </select>
                                </div>

                                <div className="form-check col-6">
                                    <label htmlFor="exampleInputPassword1">Available</label>
                                    <select style={{ borderColor: "#ced4da" }} onChange={(e) => setAvailable(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option value={"true"} >Available</option>
                                        <option value={"false"}>Not Available</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Item Color</label>
                                <div className='d-flex justify-content-start'>
                                    <button
                                        className={colors.includes("black") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("black")}
                                        style={{ backgroundColor: 'black' }}
                                    ></button>
                                    <button
                                        className={colors.includes("white") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("white")}
                                        style={{ backgroundColor: 'white' }}
                                    ></button>
                                    <button
                                        className={colors.includes("red") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("red")}
                                        style={{ backgroundColor: 'red' }}
                                    ></button>
                                    <button
                                        className={colors.includes("green") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("green")}
                                        style={{ backgroundColor: 'green' }}
                                    ></button>
                                    <button
                                        className={colors.includes("yellow") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("yellow")}
                                        style={{ backgroundColor: 'yellow' }}
                                    ></button>
                                    <button
                                        className={colors.includes("blue") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("blue")}
                                        style={{ backgroundColor: 'blue' }}
                                    ></button>
                                    <button
                                        className={colors.includes("pink") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("pink")}
                                        style={{ backgroundColor: 'pink' }}
                                    ></button>
                                    <button
                                        className={colors.includes("gray") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("gray")}
                                        style={{ backgroundColor: 'gray' }}
                                    ></button>
                                    <button
                                        className={colors.includes("brown") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("brown")}
                                        style={{ backgroundColor: 'brown' }}
                                    ></button>
                                    <button
                                        className={colors.includes("orange") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("orange")}
                                        style={{ backgroundColor: 'orange' }}
                                    ></button>
                                    <button

                                        className={colors.includes("purple") ? "colorsbutton tick-mark" : "colorsbutton"}
                                        onClick={() => setColor("purple")}
                                        style={{ backgroundColor: 'purple' }}
                                    ></button>
                                    {/* <input
                                        type="color"
                                        onChange={(e) => setColor(e.target.value)}
                                        value={colors[colors.length - 1] || '#000000'}
                                    /> */}

                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={addProduct} className="btn btn-outline-secondary">Submit</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Additemform