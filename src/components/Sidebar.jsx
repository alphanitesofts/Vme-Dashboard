import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AsyncStorage } from 'AsyncStorage';
import { useState } from 'react';
import { useEffect } from 'react';


const Sidebar = () => {

    // const employdata = await AsyncStorage.getItem('roleID')
    // return adminData = JSON.parse(roleID) 
    const [roleID, setoleID] = useState()
    const SetLocalLogin = async () => {
        try {
            let roleID = await AsyncStorage.getItem('roleID');
            if (roleID !== null) {
                setoleID(roleID)
            }
        } catch {
            return null;
        }
        console.log(roleID)
    }
    useEffect(() => { SetLocalLogin() }, [])


    const userData = () => {
        if (roleID === "4") {
            return (
                <ul className="nav nav-treeview ">

                    <li className="nav-item completed">
                        <Link to="/Additemform" className="nav-link">
                            <i className="fa-solid fa-plus" />&nbsp;&nbsp;
                            <p >Add item</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Getitem" className="nav-link">
                            <i className="fa-solid fa-pencil" />&nbsp;&nbsp;
                            <p >Get item</p>
                        </Link>
                    </li>
                </ul>
            )
        }
        else if (roleID === "0") {
            return (
                <ul className="nav nav-treeview ">
                    <li className="nav-item current">
                        <Link to="/" className="nav-link">
                            <i class="fa-solid fa-user active"></i>&nbsp;&nbsp;
                            <p>Current Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item current">
                        <Link to="/Pendingorders" className="nav-link">
                            <i className="fa-solid fa-stopwatch" />&nbsp;&nbsp;
                            <p>Pending Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item current">
                        <Link to="/Inprogressorders" className="nav-link">
                            <i className="fa-solid fa-spinner fa-spin-pulse" />&nbsp;&nbsp;
                            <p>In progress Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Undermakingorders" className="nav-link ">
                            <i class="fa-solid fa-scissors"></i>&nbsp;&nbsp;
                            <p>Under Making Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Enrouteorders" className="nav-link ">
                            <i className="fa-solid fa-truck" />&nbsp;&nbsp;
                            <p>Enroute Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Completedorders" className="nav-link">

                            <i className="fa-solid fa-dove" />&nbsp;&nbsp;
                            <p >Completed Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Deletedorders" className="nav-link">
                            <i className="fa-solid fa-trash-can" />&nbsp;&nbsp;
                            <p >Deleted Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Paidorders" className="nav-link">
                            <i className="fa-solid fa-money-bill" />&nbsp;&nbsp;
                            <p >Paid Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Unpaidorders" className="nav-link">
                            <i className="fa-solid fa-vault" />&nbsp;&nbsp;
                            <p >Unpaid Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Returnorders" className="nav-link">
                            <i class="fa-solid fa-arrow-rotate-left"></i>&nbsp;&nbsp;
                            <p >Return Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Scamorders" className="nav-link">
                            <i class="fa-solid fa-people-robbery"></i>&nbsp;&nbsp;
                            <p >Scam Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Additemform" className="nav-link">
                            <i className="fa-solid fa-plus" />&nbsp;&nbsp;
                            <p >Add item</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Getitem" className="nav-link">
                            <i className="fa-solid fa-display" />&nbsp;&nbsp;
                            <p >Get item</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/AddNews" className="nav-link">
                            <i className="fa-solid fa-newspaper" />&nbsp;&nbsp;
                            <p >Add News</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/UpdateNews" className="nav-link">
                            <i className="fa-solid fa-pencil" />&nbsp;&nbsp;
                            <p >Update News</p>
                        </Link>
                    </li>
                </ul>
            )
        }

        else {
            return (
                <ul className="nav nav-treeview ">
                    <li className="nav-item current">
                        <Link to="/" className="nav-link">
                            <i class="fa-solid fa-user active"></i>&nbsp;&nbsp;
                            <p>Current Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item current">
                        <Link to="/Pendingorders" className="nav-link">
                            <i className="fa-solid fa-stopwatch" />&nbsp;&nbsp;
                            <p>Pending Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item current">
                        <Link to="/Inprogressorders" className="nav-link">
                            <i className="fa-solid fa-spinner fa-spin-pulse" />&nbsp;&nbsp;
                            <p>In progress Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Undermakingorders" className="nav-link ">
                            <i class="fa-solid fa-scissors"></i>&nbsp;&nbsp;
                            <p>Under Making Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Enrouteorders" className="nav-link ">
                            <i className="fa-solid fa-truck" />&nbsp;&nbsp;
                            <p>Enroute Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Completedorders" className="nav-link">

                            <i className="fa-solid fa-dove" />&nbsp;&nbsp;
                            <p >Completed Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Deletedorders" className="nav-link">
                            <i className="fa-solid fa-trash-can" />&nbsp;&nbsp;
                            <p >Deleted Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Paidorders" className="nav-link">
                            <i className="fa-solid fa-money-bill" />&nbsp;&nbsp;
                            <p >Paid Orders</p>
                        </Link>
                    </li>
                    <li className="nav-item completed">
                        <Link to="/Unpaidorders" className="nav-link">
                            <i className="fa-solid fa-vault" />&nbsp;&nbsp;
                            <p >Unpaid Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Returnorders" className="nav-link">
                            <i class="fa-solid fa-arrow-rotate-left"></i>&nbsp;&nbsp;
                            <p >Return Orders</p>
                        </Link>
                    </li>

                    <li className="nav-item completed">
                        <Link to="/Scamorders" className="nav-link">
                            <i class="fa-solid fa-people-robbery"></i>&nbsp;&nbsp;
                            <p >Scam Orders</p>
                        </Link>
                    </li>
                </ul>
            )
        }
    }

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light"><b>DIGI</b>card</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Welcome back, <b>Faraz</b></a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                {
                                    userData()
                                }
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>


        </div>
    )
}

export default Sidebar