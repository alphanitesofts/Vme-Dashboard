import baseUrlforImages from '../Sourcefiles/baseUrlforImages';
import React from 'react';
import Modal from 'react-modal'
import { saveAs } from "file-saver";

const Infoform = ({ shouldShow, closeModal, userData }) => {

  const saveFile = () => {
    saveAs(`${baseUrlforImages}${userData.profile_pic}`);
  };

  console.log(`${baseUrlforImages}${userData.profile_pic}`)

  return (
    <Modal
      isOpen={shouldShow}
      contentLabel="Example Modal"
    >
      <div className='content-wrapper'>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-widget widget-user" >
              <div className="widget-user-header text-white bg-secondary" >
                <button className='btn btn-outline-danger backgroundblur' style={{ float: "left" }} onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
              </div>
              {/* src={`${baseUrlforImages}${userData.cover_photo}`}  */}
              {/* <div className="widget-user-image"  >
                <img className="img-circle" style={{ height: "100px", width: "100px" }} src={`${baseUrlforImages}${userData.profile_pic}`} alt="User Avatar" />
              </div> */}
              <div className="card-footer">
                <div className="p-0">
                  <ul className="nav flex-column">
                    <h4 className='mt-2 text-dark'><b> User Info</b></h4>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        UserID: <b className="float-right text-secondary">{userData.user_id}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        City: <b className="float-right text-secondary">{userData.city}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Quantity: <b className="float-right text-secondary">{userData.quantity}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Phone Number: <b className="float-right text-secondary">{userData.contact_address}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Product ID: <b className="float-right text-secondary">{userData.product_id}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        DATE: <b className="float-right text-secondary">{userData.Idate}</b>
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