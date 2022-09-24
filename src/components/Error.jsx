import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header ">
                    <div className="container-fluid ">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>An Error occured while loading your page</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/Login'>Home</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="error-page mt-5">
                        <h2 className="headline text-secondary"> :/</h2>
                        <div className="error-content">
                            <h3><i className="fas fa-exclamation-triangle text-secondary" /> Oops! Page not found.</h3>
                            <p>
                                We could not find the page you were looking for.
                                Meanwhile, you may <Link to="/Login">return to dashboard</Link> or try using the search form.
                            </p>
                            <form className="search-form">
                                <div className="input-group">
                                    <input type="text" name="search" className="form-control" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button type="submit" name="submit" className="btn btn-secondary"><i className="fas fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}

export default Error