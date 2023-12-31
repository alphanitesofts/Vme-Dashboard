import { Modal } from 'pretty-modal'
import React from 'react'
import Moment from 'react-moment'
import baseUrlforImages from '../Sourcefiles/baseUrlforImages'

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
                <img src={`${baseUrlforImages}${userData.image_1}`} className='img-fluid' alt="" />
              </div>
            </div>
            <div className='col-lg-6'>
              <h3 className='mt-0 mb-1'>{userData.category_name}</h3>
              <p className='mt-0 mb-1'>Category id: {userData.category_id}</p>
              <p className='mt-0 mb-1'>Price: <span style={{ fontSize: '13px', textDecoration: 'line-through' }}>{userData.item_price}</span>&nbsp;{userData.actual_price}</p>
              <p className='mt-0 mb-1'>{userData.item_colour.map((color) => (
                <button
                  key={color}
                  className="round-circle me-1"
                  style={{ backgroundColor: color }}
                ></button>
              ))}</p>
              <p className='mt-0 mb-1'><Moment format='DD/MM/YYYY' >{userData.created_at}</Moment></p>
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