import baseUrlforImages from '../baseUrlforImages';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'
import Baseurl from '../url';

const Infoform = ({ shouldShow, closeModal, userData }) => {
  const location = useLocation();

  return (
    <Modal
      isOpen={shouldShow}
      contentLabel="Example Modal"
    >
      <div className='content-wrapper p-4'>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-widget widget-user" >
              <div class="widget-user-header text-white" style={{
                backgroundImage: `url(${baseUrlforImages}${userData.cover_photo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }} >
                <button className='btn btn-outline-danger backgroundblur' style={{ float: "left" }} onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
                <h3 className="widget-user-username text-right text-white"><b>{userData.name}</b></h3>
                <h5 className="widget-user-desc text-right text-white"><b>{userData.phone}</b></h5>
              </div>
              {/* src={`${baseUrlforImages}${userData.cover_photo}`}  */}
              <div className="widget-user-image"  >
                <img className="img-circle" style={{ height: "100px", width: "100px" }} src={`${baseUrlforImages}${userData.profile_photo}`} alt="User Avatar" />
              </div>


              <div className="card-footer">
                <div className="p-0">
                  <ul className="nav flex-column">
                    {/* <li class="list-group-item">
                      <b>Followers</b> <a class="float-right">1,322</a>
                      </li> */}
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Address: <b className="float-right text-secondary">{userData.address}</b>
                      </a>
                    </li>
                    <h4 className='mt-2 text-dark'><b> Socials</b></h4>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Facebook: <b className="float-right text-secondary">{userData.facebook}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Instagram: <b className="float-right text-secondary">{userData.instagram}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Twitter: <b className="float-right text-secondary">{userData.twitter}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Snapchat: <b className="float-right text-secondary">{userData.snapchat}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Telegram: <b className="float-right text-secondary">{userData.telegram}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Tiktok: <b className="float-right text-secondary">{userData.tiktok}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Skype: <b className="float-right text-secondary">{userData.skype}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Pintrest: <b className="float-right text-secondary">{userData.printest}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Mail: <b className="float-right text-secondary">{userData.phone}</b>
                      </a>
                    </li>
                    <h4 className='mt-2 text-dark'><b> User Info</b></h4>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Short Description: <b className="float-right text-secondary">{userData.gmail}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Age: <b className="float-right text-secondary">{userData.age}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Religion: <b className="float-right text-secondary">{userData.religion}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Bio: <b className="float-right text-secondary">{userData.bio}</b>
                      </a>
                    </li>
                    <h4 className='mt-2 text-dark'><b>Professional Accounts</b></h4>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Linkedin: <b className="float-right text-secondary">{userData.linkedin}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Github: <b className="float-right text-secondary">{userData.github}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        StackOverflow: <b className="float-right text-secondary">{userData.stackoverflow}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Fiver: <b className="float-right text-secondary">{userData.fiverr}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Upwork: <b className="float-right text-secondary">{userData.upword}</b>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        CV: <b className="float-right text-secondary">{userData.cv}</b>
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