import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import 'moment-timezone';
import Moment from 'react-moment';
import Infoform from '../Modals/Infoform';
import Baseurl from '../Sourcefiles/url'
import InfoCategory from '../Modals/InfoCategory'


const Getitem = () => {

    const [getItems, setGetItems] = useState([])
    const [loader, setLoader] = useState(false)
    const [userID, setUserID] = useState()
    const [shouldShow, setShouldShow] = useState(false)

    const showData = () => {
        setLoader(true)
        axios.get(`${Baseurl}fetchAllcategory`)
            .then(res => {
                setGetItems(res.data.data)
                console.log(res)
                setLoader(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    useEffect(() => {
        showData()
    }, [])


    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Available Items</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body table-responsive">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Category Description</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                loader === true ?
                                                    <>
                                                        <div className='content-wrapper'>
                                                            <div className="loader">
                                                                <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    // getItems.map((items) => {
                                                    getItems.sort((a, b) => new Date(...b.created_at.split("/").reverse()) - new Date(...a.created_at.split("/").reverse())).map((items) => {
                                                        return (
                                                            <tr>
                                                                <td>{items.id}</td>
                                                                <td>{items.category_name}</td>
                                                                <td>{items.category_description}</td>
                                                                <td><Moment format='DD/MM/YYYY' >{items.created_at}</Moment></td>
                                                                <td>
                                                                    <button className='btn btn-outline-primary m-1' onClick={() => {
                                                                        oncloseModal()
                                                                        setUserID(items)
                                                                    }}>Edit</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    userID ?
                        <InfoCategory
                            shouldShow={shouldShow}
                            closeModal={oncloseModal}
                            userData={userID}
                        />
                        : null}
            </section>
        </div>
    )
}

export default Getitem