import { Modal } from 'pretty-modal'
import React from 'react'
import randomImage from '../Sourcefiles/Images/error-image.jpg'
const InfoItem = ({ closeModal, userData, shouldShow }) => {
  return (
    <div>
      <Modal open={shouldShow}>
        <div className='content-header'>
          <div className='float-right'>
          <button className='btn btn-sm btn-outline-danger' onClick={() => closeModal()}>X</button>
          </div> 
          <div className='row'>
            <div className='col-lg-6'>
              <div>
                <img src={randomImage} className='img-fluid' alt="" />
              </div>
            </div>
            <div className='col-lg-6'>
              <h3>{userData.actual_price}</h3>
              <p className='mt-0 mb-1'>{userData.item_price}</p>
              <p className='mt-0 mb-1'>{userData.item_colour}</p>
              <p className='mt-0 mb-1'>{userData.created_at}</p>
              <p className='mt-0 mb-1'>{userData.category_name}</p>
              <p className='mt-0 mb-1'>{userData.category_id}</p>
              <p className='mt-0 mb-1'>{userData.is_hot}</p>
              <p className='mt-0 mb-1'>{userData.availability}</p>
              <p className='mt-0 mb-1'>{userData.description}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default InfoItem