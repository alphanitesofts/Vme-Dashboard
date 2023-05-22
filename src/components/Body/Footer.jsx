import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="main-footer">
                {/* To the right */}
                <div className="float-right d-none d-sm-inline">
                    Anything you want
                </div>
                {/* Default to the left */}
                <strong>Copyright © 2014-2021 <a href="https://alphanites.netlify.app/">Aplha Nite</a>.</strong> All rights reserved.
            </footer>
        </div>
    )
}

export default Footer