import React, { useEffect, useState } from 'react'
import axios, { Axios, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import Baseurl from '../Sourcefiles/url'
import Modal from 'react-modal'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const UpdateNewsModal = ({ shouldShow, closeModal, userData }) => {

    const { quill, quillRef } = useQuill();
    const [value, setValue] = useState('')
    const [updateTitle, setUpdateTitle] = useState(userData.title)
    const [fieldStatus, setFieldStatus] = useState(false)

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(`${userData.body}`);
            console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            setValue(quillRef.current.firstChild.innerHTML);
        }
    }, [quill]);

    const UpdatePublishNews = () => {
        setFieldStatus(true)
        if (!updateTitle || !value) {
            toast.warn("Please fill all Fields")
        }
        else {
            const userObj = {
                title: updateTitle,
                body: value
            }
            axios.post(`${Baseurl}updateNews/${userData.id}`, userObj)
                .then(res => {
                    console.log(res)
                    toast.info("News updated successfully")
                    closeModal()
                    setInterval(() => {
                        window.location.reload(true)
                    }, 500);
                })
                .catch((err) => {
                    console.log(err)
                    toast.warn("Error while publishing news")
                })
        }
    }

    return (
        <Modal
            isOpen={shouldShow}
            contentLabel="Example Modal" >
            <div className='content-wrapper'>
                <section className="">
                    <div className="container-fluid">
                        <div className="">
                            <div className="">
                                <div className="card p-4">
                                    <div className='d-flex bd-highlight'>
                                        <h3 className="p-2 w-100 bd-highlight">Add the News for the Coustomers here please!</h3>
                                        <button className='btn btn-outline-danger p-2 flex-shrink-1 bd-highlight' onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                    <div>
                                        <h4> Title for News</h4>
                                        <p >{updateTitle === "" && fieldStatus === true ? <span className='text-danger'> Please Add Title for your news</span> : console.log(".-.")}</p>
                                        <div style={{ borderColor: updateTitle === "" && fieldStatus === true ? "red" : 'black', border: "1px solid", padding: '2px', minHeight: '80px' }}>
                                            <input value={updateTitle} type="email" className="form-control form-control-lg" onChange={(e) => setUpdateTitle(e.target.value)} style={{ borderColor: "white" }} name='titleNews' id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </div>

                                    <h4 className='mt-3'> Body for News</h4>
                                    <p>{value === "" && fieldStatus === true ? <span className='text-danger'>Please Add body to your news!</span> : console.log(".-.")}</p>
                                    <div className="" style={{ borderColor: value === "" && fieldStatus === true ? "red" : 'black', border: "1px solid", padding: '2px', minHeight: '400px' }}>
                                        <div>
                                            <div ref={quillRef} />
                                        </div>
                                    </div>
                                    <button onClick={UpdatePublishNews} className="btn w-25 mt-2 btn-outline-secondary mx-auto">Update News</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    )
}

export default UpdateNewsModal