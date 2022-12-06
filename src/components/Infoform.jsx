import baseUrlforImages from '../baseUrlforImages';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import Baseurl from '../url';
import fileDownload from 'js-file-download'
import { saveAs } from "file-saver";

const Infoform = ({ shouldShow, closeModal, userData }) => {
  const location = useLocation();

  const saveFile = () => {
    saveAs(`${baseUrlforImages}${userData.profile_pic}`);
  };

  return (
    <Modal
      isOpen={shouldShow}
      contentLabel="Example Modal"
    >
      <div className='content-wrapper'>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-widget widget-user" >
              <div class="widget-user-header text-white bg-secondary" >
                <button className='btn btn-outline-danger backgroundblur' style={{ float: "left" }} onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
                <h3 className="widget-user-username text-right text-white"><b>{userData.name}</b></h3>
                <h5 className="widget-user-desc text-right text-white"><b>{userData.phone_number}</b></h5>
              </div>
              {/* src={`${baseUrlforImages}${userData.cover_photo}`}  */}
              <div className="widget-user-image"  >
                <img className="img-circle" style={{ height: "100px", width: "100px" }} src={`${baseUrlforImages}${userData.profile_pic}`} alt="User Avatar" />
              </div>

              <div className="card-footer">
                <div className="p-0">
                  <ul className="nav flex-column">
                    <h4 className='mt-2 text-dark'><b> User Info</b></h4>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Address: <b className="float-right text-secondary">{userData.address}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Short Description: <b className="float-right text-secondary">{userData.email}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Secondary Contact: <b className="float-right text-secondary">{userData.contact_number}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Region: <b className="float-right text-secondary">{userData.region}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        City: <b className="float-right text-secondary">{userData.city}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Postal Code: <b className="float-right text-secondary">{userData.postal_code}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Quantity: <b className="float-right text-secondary">{userData.quantity}</b>
                      </a>
                    </li>

                    <li className="nav-item">
                      {/* <a href="#" className="nav-link">
                        CV: <b className="float-right text-secondary">{userData.cv}</b>
                      </a> */}
                      <a href="#" className="nav-link">
                        Profile Photo: <button className='btn btn-outline-secondary float-right ' onClick={saveFile}>
                          Download
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}


export default Infoform