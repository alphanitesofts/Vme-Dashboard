import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Baseurl from '../url'
import Modal from 'react-modal'
import UpdateNewsModal from './UpdateNewsModal'


const UpdateNews = () => {

    const [data, setData] = useState([])
    const [warningModal, setWarningModal] = useState(false)
    const [userID, setUserID] = useState()
    const [shouldShow, setShouldShow] = useState(false)
    const [loader, setLoader] = useState(false)
    const [searchTitle, setSearchTitle] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const recieveData = () => {
        setLoader(true)
        axios.get(`${Baseurl}fetchNews`)
            .then((res) => {
                setLoader(false)
                setData(res.data)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteData = (id) => {
        axios.post(`${Baseurl}deleteNews/${id}`)
            .then((res) => {
                recieveData()
                console.log(res)
                toast.success("News delete successfully")
                setWarningModal(false)
            })
            .catch((err) => {
                console.log(err)
                toast.warning("Error while deleting news")
            })
    }

    const dataRender = () => {
        if (!searchTitle && !searchDate) {
            return (
                data.map((items) => {
                    return (
                        <>
                            <div className='col-12'>
                                <div className='d-flex'>
                                    <div className='card w-100' style={{ borderRadius: "10px" }}>
                                        <div className='card-body'>
                                            <div>
                                                <h3>{items.title}</h3>
                                                <h6 className='form-text'>{items.Idate}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-outline-primary mt-4 ms-2 mb-4' onClick={() => {
                                        setUserID(items)
                                        oncloseModal()
                                    }}><i className="fa-solid fa-marker" />
                                    </button>
                                    <button className='btn btn-outline-danger mt-4 ms-2 mb-4' onClick={() => {
                                        setWarningModal(true)
                                        setUserID(items.id)
                                    }}><i className="fa-solid fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })
            )
        }
        else if (!searchDate && searchTitle) {
            return (
                data.filter((objects) => objects.title === searchTitle).map((items) => {
                    return (
                        <>
                            <div className='col-12'>
                                <div className='d-flex'>
                                    <div className='card w-100' style={{ borderRadius: "10px" }}>
                                        <div className='card-body'>
                                            <div>
                                                <h3>{items.title}</h3>
                                                <h6 className='form-text'>{items.Idate}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-outline-primary mt-4 ms-2 mb-4' onClick={() => {
                                        setUserID(items)
                                        oncloseModal()
                                    }}><i className="fa-solid fa-marker" />
                                    </button>
                                    <button className='btn btn-outline-danger mt-4 ms-2 mb-4' onClick={() => {
                                        setWarningModal(true)
                                        setUserID(items.id)
                                    }}><i className="fa-solid fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })
            )
        }
        else if (!searchTitle && searchDate) {
            return (
                data.filter((objects) => objects.Idate === searchDate).map((items) => {
                    return (
                        <>
                            <div className='col-12'>
                                <div className='d-flex'>
                                    <div className='card w-100' style={{ borderRadius: "10px" }}>
                                        <div className='card-body'>
                                            <div>
                                                <h3>{items.title}</h3>
                                                <h6 className='form-text'>{items.Idate}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-outline-primary mt-4 ms-2 mb-4' onClick={() => {
                                        setUserID(items)
                                        oncloseModal()
                                    }}><i className="fa-solid fa-marker" />
                                    </button>
                                    <button className='btn btn-outline-danger mt-4 ms-2 mb-4' onClick={() => {
                                        setWarningModal(true)
                                        setUserID(items.id)
                                    }}><i className="fa-solid fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })
            )
        }
    }
    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }
    useEffect(() => { recieveData() }, [])

    return (
        <div>
            {/* Warning Modal */}
            <Modal
                isOpen={warningModal}
                contentLabel="Example Modal"
            >
                <div className='content-wrapper' >
                    <div className="modalBackground" >
                        <div className="modalContainer" >
                            <div className="titleCloseBtn">
                                <button onClick={() => { setWarningModal(false); }} >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className="title">
                                <h1>Are You Sure You Want to Delete this News?</h1>
                            </div>
                            <div className="footer">
                                <button onClick={() => { setWarningModal(false); }} id="cancelBtn" >Cance</button>
                                <button onClick={() => deleteData(userID)}>Continue </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* End of warning Modal */}

            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h4 className="m-0"><i class="fa-thin fa-clock-desk"></i>Update News</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

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
                                        <>
                                            <div className="card">

                                                <div className="card-header">
                                                    <h3 className="card-title">Pusblished news can be updated here</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group d-flex" >
                                                        {/* <input className="form-control" type="number" placeholder="Search with id" aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp; */}
                                                        <input className="form-control" type="text" onChange={(e) => setSearchTitle(e.target.value)} placeholder="Search with title" aria-label="Search" style={{ borderRadius: "10em" }} />&nbsp;&nbsp;&nbsp;
                                                        <input className="form-control" type="text" onChange={(e) => setSearchDate(e.target.value)} placeholder="Enter date in YYYY-MM-DD" aria-label="Search" style={{ borderRadius: "10em" }} />
                                                    </div>

                                                    {
                                                        dataRender()
                                                    }
                                                </div>
                                            </div>
                                        </>
                                }

                                {
                                    userID ?
                                        <UpdateNewsModal
                                            shouldShow={shouldShow}
                                            closeModal={oncloseModal}
                                            userData={userID} /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNews