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


const AddCategory = () => {
    //category
    const [itemName, setItemName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [fieldStatus, setFieldStatus] = useState(false)
    //add category

    const addCategory = () => {
        setFieldStatus(true)
        if (itemName === "" && categoryDescription === "") {
            toast.error("Please fill all the fields")
        }
        else {
            var formdata = new FormData();
            formdata.append("category_name", itemName);
            formdata.append("category_description", categoryDescription);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${Baseurl}Addcategory`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setFieldStatus(false)
                    console.log(result)
                    toast.success('Category Added Successfully')
                })
                .catch(error => {
                    console.log('error', error)
                    toast.warn('Error while adding category')
                });
        }
    }

    return (
        <div className='content-wrapper '>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add New Inventory Item</h1>
                        </div>
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <div className="container pt-3">
                <div className='container'>
                    <div className="card card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">Add Category:</h3>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1">Item Name</label>
                                    <input
                                        style={{ borderColor: itemName === "" && fieldStatus === true ? "red" : '#ced4da' }}
                                        onChange={(e) => setItemName(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === ' ') {
                                                e.preventDefault();
                                            }
                                        }}
                                        type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter product itemName" />
                                    <p >{itemName === "" && fieldStatus === true ? <span className='text-danger'> Please Add itemName for the item</span> : null}</p>
                                </div>

                                <div className="col-12 pb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Description:</b></label>
                                    <textarea style={{ borderColor: categoryDescription === "" && fieldStatus === true ? "red" : '#ced4da' }} className="form-control" onChange={(e) => setCategoryDescription(e.target.value)} id="exampleFormControlTextarea1" rows={5} placeholder="Write short describtion about the product ..." defaultValue={""} />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={addCategory} className="btn btn-outline-secondary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory