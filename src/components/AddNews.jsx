import React, { useState, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import Baseurl from '../url';
import { toast } from 'react-toastify';

const AddNews = () => {
    const { quill, quillRef } = useQuill('');
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [fieldStatus, setFieldStatus] = useState(false)

    console.log(value)

    const publishNews = () => {

        setFieldStatus(true)
        if (!title || !value) {
            toast.warn("Please fill all Fields")
        }
        else if (!title && value) {
            toast.warning("Please enter Title of your news")
        }
        else if (!value && title) {
            toast.warn("Please add body to your news")
        }
        else {
            const userObj = {
                title: title,
                body: value
            }
            axios.post(`${Baseurl}postNews`, userObj)
                .then((res) => {
                    console.log(res)
                    toast.info("News publised successfully")
                    setInterval(() => {
                        window.location.reload(true)
                    }, 2000)
                })
                .catch((err) => {
                    console.log(err)
                    toast.warn("Error while publishing news")
                })
        }
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                setValue(quillRef.current.firstChild.innerHTML)
            });
        }
    }, [quill]);

    return (
        <div>
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Add News</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card p-4">
                                    <h3 className="">Add the News for the Coustomers here please!</h3>

                                    <div>
                                        <h4> Title for News</h4>
                                        <p >{title === "" && fieldStatus === true ? <span className='text-danger'> Please Add Title for your news</span> : console.log(".-.")}</p>
                                        <div style={{ borderColor: title === "" && fieldStatus === true ? "red" : 'black', border: "1px solid", borderRadius: "5px", padding: '2px', minHeight: '80px' }}>
                                            <input type="email" className="form-control form-control-lg" onChange={(e) => setTitle(e.target.value)} style={{ borderColor: "white", fontSize: "30px" }} name='titleNews' id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </div>

                                    <h4 className='mt-3'> Body for News</h4>
                                    <p>{value === "" && fieldStatus === true ? <span className='text-danger'>Please Add body to your news!</span> : console.log(".-.")}</p>
                                    <div className="" style={{ borderColor: value === "" && fieldStatus === true ? "red" : 'black', border: "1px solid", borderRadius: "5px", padding: '2px', minHeight: '400px' }}>


                                        <div >
                                            <div ref={quillRef} />
                                        </div>
                                    </div>
                                    <button onClick={publishNews} className="btn w-25 mt-2 btn-outline-secondary mx-auto">Publish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddNews