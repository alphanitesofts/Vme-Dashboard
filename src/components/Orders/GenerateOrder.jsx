import React, { useState } from "react";
import { toast } from "react-toastify";
import Baseurl from "../Sourcefiles/url";

const GenerateOrder = () => {
    const [userId, setUserId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [contactAdress, setContactAdress] = useState("");
    const [productId, setProductId] = useState("");
    const [fieldStatus, setFieldStatus] = useState(false);
    const [addCount, setAddCount] = useState(1);

    const createOrder = () => {
        setFieldStatus(true);
        if (
            userId === "" ||
            address === "" ||
            state === "" ||
            contactAdress === "" ||
            productId === ""
        ) {
            toast.warn("Please fill all fields");
        } else {
            var formdata = new FormData();
            formdata.append("user_id", userId);
            formdata.append("address", address);
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("quantity", addCount);
            formdata.append("contact_address", contactAdress);
            formdata.append("product_id", productId);
            formdata.append("status", "pending");
            formdata.append("payment_status", "unpaid");

            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };

            fetch(
                `${Baseurl}post_order`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setFieldStatus(false);
                    console.log(result);
                    toast.success("OrderGenerated");
                })
                .catch((error) => {
                    console.log("error", error);
                    toast.warn("Error while generating order");
                });
        }
    };

    const incrementCount = () => {
        setAddCount(addCount + 1);
    };
    const decrementCount = () => {
        setAddCount(addCount - 1);
    };

    return (
        <div>
            <div className="content-wrapper ">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Add New Inventory Item</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-3">
                    <div className="container">
                        <div className="card card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">Add Product:</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">User ID</label>
                                        <input
                                            value={userId}
                                            style={{
                                                borderColor:
                                                    userId === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setUserId(e.target.value)}
                                            type="number"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Please enter the user ID ..."
                                        />
                                        {/* <p >{actualPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add actualPrice for the item</span> : null}</p> */}
                                    </div>

                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">Address</label>
                                        <input
                                            style={{
                                                borderColor:
                                                    address === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Please enter the address ..."
                                        />
                                        {/* <p >{previousPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add Previous for the item</span> : null}</p> */}
                                    </div>

                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">City</label>
                                        <input
                                            value={city}
                                            style={{
                                                borderColor:
                                                    city === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setCity(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Please enter the city ..."
                                        />
                                        {/* <p >{actualPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add actualPrice for the item</span> : null}</p> */}
                                    </div>

                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">State</label>
                                        <input
                                            style={{
                                                borderColor:
                                                    state === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setState(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="State of the customer"
                                        />
                                        {/* <p >{previousPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add Previous for the item</span> : null}</p> */}
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">
                                            Contact Address
                                        </label>
                                        <input
                                            style={{
                                                borderColor:
                                                    contactAdress === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setContactAdress(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Please enter the address ..."
                                        />
                                        {/* <p >{previousPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add Previous for the item</span> : null}</p> */}
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">Product ID</label>
                                        <input
                                            style={{
                                                borderColor:
                                                    productId === "" && fieldStatus === true
                                                        ? "red"
                                                        : "#ced4da",
                                            }}
                                            onChange={(e) => setProductId(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Please enter the address ..."
                                        />
                                        {/* <p >{previousPrice === "" && fieldStatus === true ? <span className='text-danger'> Please Add Previous for the item</span> : null}</p> */}
                                    </div>

                                    <div className="form-group col-6">
                                        <label htmlFor="exampleInputPassword1">Quantity</label>
                                        <div className="mt-2">
                                            {addCount > 1 ? (
                                                <button
                                                    className="btn btn-secondary me-2 btn-sm"
                                                    onClick={decrementCount}
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </button>
                                            ) : null}
                                            <label
                                                className="text-dark"
                                                htmlFor="exampleInputPassword1"
                                            >
                                                {addCount}
                                            </label>
                                            <button
                                                className="btn btn-secondary ms-2 btn-sm"
                                                onClick={incrementCount}
                                            >
                                                <i className="fa-solid fa-angle-right" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="submit"
                                    onClick={createOrder}
                                    className="btn btn-outline-secondary"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateOrder;
