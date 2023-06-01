import React, { useState, useEffect } from 'react';
import 'moment-timezone';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import 'moment-timezone';
import Baseurl from '../Sourcefiles/url';
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import colorOptions from '../Sourcefiles/color'
import axios from 'axios';


toast.configure()
const Additemform = () => {

    const [data, setData] = useState([])
    const [productId, setProductId] = useState()
    const [error, setError] = useState()

    // products
    const [picture, setPicture] = useState('')
    const [actualPrice, setActualPrice] = useState('')
    const [previousPrice, setPreviousPrice] = useState('')
    const [productDes, setProductDesc] = useState('')
    const [getColor, setColor] = useState('')
    const [available, setAvailable] = useState('Card')
    const [hot, setHot] = useState(false)
    const [fieldStatus, setFieldStatus] = useState(false)

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


    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };


    // add product
    const addProduct = async () => {
        setFieldStatus(true)

        if (!actualPrice || !picture || !productDes || !productId) {
            toast.warning("Please fill all fields")
        }

        if (!picture) {
            toast.warning("Please add a picture for the item");
            return;
        }
        else {

            const base64Image = await convertImageToBase64(picture);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "item_price": previousPrice,
                "actual_price": actualPrice,
                "description": productDes,
                "is_hot": hot,
                "category_id": productId,
                "availability": available,
                "item_images": base64Image,
                "item_colour": getColor
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${Baseurl}Addproducts`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setFieldStatus(false)
                    if (result.status === "401") {
                        toast.error('Something went wrong')
                        // setError(result.message)
                    }
                    else {
                        toast.success('Data added successfully')
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    toast.warn("Error while submitting data")

                });
            console.log(raw)
        }
    }

    const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return { ...styles, color: data.color };
        },
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: data.color,
                color: "#fff",
            };
        },
        multiValueLabel: (styles, { data }) => {
            return {
                ...styles,
                color: "#fff",
            };
        },
        multiValueRemove: (styles, { data }) => {
            return {
                ...styles,
                color: "#fff",
                cursor: "pointer",
                ":hover": {
                    color: "#fff",
                },
            };
        },
    };
    const handleChange = (selectedOption, actionMeta) => {
        setColor(selectedOption)
        console.log("handleChange", selectedOption, actionMeta);
    };
    const handleInputChange = (inputValue, actionMeta) => {
        console.log("handleInputChange", inputValue, actionMeta);
    };

    // const options = [
    //     { label: 'black', value: 'black' },
    //     { label: 'red', value: 'red' },
    //     { label: 'blue', value: 'blue' },
    //     { label: 'pink', value: 'pink' },
    //     { label: 'green', value: 'green' },
    // ]

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
                                <div className='form-group col-6'>
                                    <label htmlFor="exampleInputFile">Category</label>
                                    <select onChange={(e) => setProductId(e.target.value)} className="form-select" aria-label="Default select example">
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
                                            {/* <input onChange={(e) => setPicture(e.target.files[0])} className="form-control" style={{ borderColor: picture === "" && fieldStatus === true ? "red" : '#ced4da' }} type="file" id="formFileMultiple"  multiple/> */}

                                            <input onChange={(e) => setPicture(e.target.files[0])} className="form-control" style={{ borderColor: picture === "" && fieldStatus === true ? "red" : '#ced4da' }} type="file" id="formFileMultiple" multiple />

                                        </div>

                                    </div>
                                    <p className='mt-0 mb-0'>{picture === "" && fieldStatus === true ? <span className='text-danger'> Please Add picture for the item</span> : null}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">Actual Price</label>
                                    <input value={actualPrice} style={{ borderColor: actualPrice === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setActualPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Item Price as given" />
                                    {/* <p >{actualPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add actualPrice for the item</span> : null}</p> */}
                                </div>

                                <div className="form-group col-6">
                                    <label htmlFor="exampleInputPassword1">Previous Price</label>
                                    <input style={{ borderColor: previousPrice === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setPreviousPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1" placeholder="Item Price as given" />
                                    {/* <p >{previousPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add Previous for the item</span> : null}</p> */}

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
                                    <button className={getColor === "black" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('black')} style={{ backgroundColor: 'black' }}></button>
                                    <button className={getColor === "red" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('red')} style={{ backgroundColor: 'red' }}></button>
                                    <button className={getColor === "blue" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('blue')} style={{ backgroundColor: 'blue' }}></button>
                                    <button className={getColor === "pink" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('pink')} style={{ backgroundColor: 'pink' }}></button>
                                    <button className={getColor === "yellow" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('yellow')} style={{ backgroundColor: 'yellow' }}></button>
                                    <button className={getColor === "green" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('green')} style={{ backgroundColor: 'green' }}></button>
                                    <button className={getColor === "grey" ? "colorsbutton border border-info" : "colorsbutton"} onClick={() => setColor('grey')} style={{ backgroundColor: 'grey' }}></button>
                                </div>

                                {/* <CreatableSelect
                                    options={colorOptions}
                                    onChange={handleChange}
                                    onInputChange={handleInputChange}
                                    isMulti
                                styles={colorStyles}
                                /> */}
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={addProduct} className="btn btn-outline-secondary">Submit</button>
                            {/* {
                                error !== '' ?
                                    <p>{error}</p> : null
                            } */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Additemform