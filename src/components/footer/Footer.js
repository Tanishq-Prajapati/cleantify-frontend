import React from "react";

// importing all the react icons here
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

// importing the CSS here
import "./Footer.css";

const Footer = () => {

    // getting the cleantify logo here
    const cleanity_logo_text = require("../../utility/images/logo/logo_text.png")
    
    return (
        <div className="footer">
            <div className="footer-cont">
                <div className="cleantify_logo">
                    Cleantify
                </div>
                <div className="footer-message">
                    Copyright @ 2024 Cleantify, Inc
                </div>
                <div className="footer-icons">
                    <FaFacebookF 
                        className="a-footer-icon"
                        onClick={()=>open("https://www.facebook.com/profile.php?id=100088843502685")}
                    ></FaFacebookF>
                    <FaInstagram 
                        className="a-footer-icon"
                        onClick={()=>open("https://www.instagram.com/web.tanishq.dev?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
                    ></FaInstagram>
                    <FaTwitter className="a-footer-icon"></FaTwitter>
                </div>
            </div>
        </div>
    )
}

export default Footer