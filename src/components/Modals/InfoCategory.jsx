import React, { useState } from 'react'
import { Modal } from 'pretty-modal'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Baseurl from '../Sourcefiles/url';
import axios from 'axios';

const InfoCategory = ({ closeModal, userData, shouldShow }) => {

    const [itemName, setItemName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [fieldStatus, setFieldStatus] = useState(false)
    const userID = userData.id

    const updateCategory = () => {
        setFieldStatus(true)
        if (itemName === "" && categoryDescription === "") {
            toast.error("Please fill all the fields")
        }
        else {

            const userObj = {
                category_name: itemName,
                category_description: categoryDescription
            }

            axios.post(`${Baseurl}update_category/${userID}`, userObj)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === "201") {
                        toast.warn('Something went wrong')
                    }
                    else if (res.data.status === "200") {
                        toast.success('Category Updated Successfully')
                        setInterval(() => {
                            window.location.reload()
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.warn("error while updating")
                })
        }
    }

    return (
        <Modal
            open={shouldShow}
        >
            <div className=' '>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Edit the Category Item</h1>
                            </div>
                            <div className='col-lg-1 mt-2 ms-auto'>
                                <button onClick={() => closeModal()} className='btn btn-sm btn-outline-danger'>X</button>
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
                                        <input defaultValue={userData.category_name} style={{ borderColor: itemName === "" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setItemName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter product itemName" />
                                        <p >{itemName === "" && fieldStatus === true ? <span className='text-danger'> Please Add itemName for the item</span> : null}</p>
                                    </div>

                                    <div className="col-12 pb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Description:</b></label>
                                        <textarea defaultValue={userData.category_description} style={{ borderColor: categoryDescription === "" && fieldStatus === true ? "red" : '#ced4da' }} className="form-control" onChange={(e) => setCategoryDescription(e.target.value)} id="exampleFormControlTextarea1" rows={5} placeholder="Write short describtion about the product ..." />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" onClick={updateCategory} className="btn btn-outline-secondary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default InfoCategory