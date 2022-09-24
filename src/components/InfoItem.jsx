import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import Baseurl from '../url';
import baseUrlforImages from '../baseUrlforImages';


const InfoItem = ({ closeModal, userData, shouldShow }) => {
    const location = useLocation();

    return (
        <Modal
            isOpen={shouldShow}
        >
            <div>
                <div className='content-wrapper '>
                    <div className='centerCard m-3 ' >
                        <div className='card col-lg-6 borderColor  container-fluid'>
                            <div className="card-body ">
                                <div className="row ">
                                    <div className="col-lg-6">
                                        <img className="img-fluid borderRadiuscard" src={`${baseUrlforImages}${userData.item_pic}`} style={{ height: "200px", width: "55em" }} alt="Photo" />
                                    </div>
                                    <div className="col-6">
                                        <button className=' m-1 btn btn-outline-danger btn-sm float-end' onClick={() => closeModal()}><i className="fa-solid fa-xmark" /></button>
                                        <div className='d-flex mt-1 mb-2'>
                                            <h5 >Item Name:</h5><p>&nbsp;&nbsp;&nbsp;<b> ~{userData.item_name}</b></p>
                                        </div>
                                        <div className='mb-2 d-flex'>
                                            <h5>Item Type:</h5><p>&nbsp;&nbsp;&nbsp;<b>~{userData.item_type}</b></p>
                                        </div>
                                        <div className='mb-2 d-flex'>
                                            <h5>Item price:</h5><p>&nbsp;&nbsp;&nbsp;<b>~{userData.item_price}</b></p>
                                        </div>
                                        <div className='mb-2 d-flex'>
                                            <h5>Item Quantity:</h5><p>&nbsp;&nbsp;&nbsp;<b> ~{userData.quantity}</b></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div>
                                        <h5><b> Description:</b></h5>
                                        <div className="mb-3 card-title">
                                            <p>{userData.describtion}</p>
                                        </div>
                                    </div> <br />
                                    <div >
                                        <h5><b> Item Color:</b></h5>
                                        <div className="mb-3 card-title">
                                            <div className='d-flex justify-content-start'>
                                                <button className="colorsbutton" style={{ backgroundColor: `${userData.item_color}` }}></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default InfoItem