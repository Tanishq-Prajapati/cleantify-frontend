import React, { useRef, useState } from 'react'

// importing all the data files here
import { anchor_data, anchor_data_mobile } from "./navbar_data"
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { BiSolidMegaphone } from "react-icons/bi";


// importing all the CSS files here for the navbar
import "./Navbar.css";
import { useEffect } from 'react';

export const Navbar = () => {
    // getting the images here using the require
    const logo_text = require("../../utility/images/logo/logo_text.png")
    const logo = require("../../utility/images/logo/logo.gif")

    // getting all the messages logo and website logo here
    const website_logo = require("../../utility/images/icons/website.png");
    const mail_logo = require("../../utility/images/icons/mail.png");
    const message_logo = require("../../utility/images/icons/message.png");

    // creating all the reference variables here
    const anchor_refs = useRef([]);
    const mobile_anchor_refs = useRef([]);
    const nav_ref = useRef();

    // adding all the useStates here
    const [show_but_menu, setShowButsMenu] = useState(false);
    const [show_nav_menu, setShowNavMenu] = useState(false);

    const clearOrangeRef = () => {
        anchor_refs.current.forEach((ele, idx) => {
            if (ele) ele.className = "dactive_nav_a";
        })
    }

    const clearOrangeRefMobile = () => {
        mobile_anchor_refs.current.forEach((ele, idx) => {
            console.log(ele, idx);
            if (ele) ele.className = "dactive_nav_a";
        })
    }

    // is scrolled check function
    const isScrolled = () => {
        if (window.scrollY >= 150) {
            nav_ref.current.id = 'navbar_sticky'
        } else {
            nav_ref.current.id = 'navbar'
        }
    }

    // adding useeffect
    useEffect(() => {
        // here i will add a listener that how much my screen is actually scrolled
        anchor_refs.current.forEach((ele, index) => {
            ele.addEventListener('click', () => {
                clearOrangeRef();
                ele.className = 'active_nav_a';
            });

            return () => {
                ele.removeEventListener('click', () => {
                    clearOrangeRef();
                    ele.className = 'active_nav_a';
                });
            };
        });

        mobile_anchor_refs.current.forEach((ele, index) => {
            ele.addEventListener('click', () => {
                clearOrangeRefMobile();
                ele.className = 'active_nav_a';
            });

            return () => {
                ele.removeEventListener('click', () => {
                    clearOrangeRefMobile();
                    ele.className = 'active_nav_a';
                });
            };
        });

        // adding a listner here
        window.addEventListener('scroll', isScrolled);
        return () => {
            window.removeEventListener('click', isScrolled);
        }
    }, [])


    return (
        <div id='navbar' ref={nav_ref}>
            <div id='navbar_top_line'>
                {"🔥  "}News letter coming soon,  please register for latest news related to cleaning designs and our updated services.
            </div>
            <div id='nav_bar_cont'>
                <div id='nav_1' className='navbar_child'>
                    <img src={logo}></img>
                    <img src={logo_text}></img>
                </div>
                <div id='nav_2' className='navbar_child'>
                    {anchor_data.map((data, index) =>
                        <a
                            className='dactive_nav_a'
                            ref={ele => { anchor_refs.current.push(ele) }}
                            key={anchor_data[2]}
                            href={`#${data[1]}`}
                        >{data[0]}</a>
                    )}
                </div>
                <div id='nav_3' className='navbar_child'>
                    <div className='nav_button2'>
                        <img src={mail_logo} />
                        <button>
                            EMAIL US
                        </button>
                    </div>
                    <div className='nav_button1'>
                        <img src={website_logo} />
                        <button>
                            Register News Letter
                        </button>
                    </div>
                    <div className='nav_button1'>
                        <img src={message_logo} />
                        <button>
                            Message me
                        </button>
                    </div>
                </div>
                <div id='nav_3_mobile_buttons'>
                    <div className='nav_buts_mobile'>
                        <BiSolidMegaphone className={`hamburger ${(show_but_menu) ? 'hamburger_rotate' : ''}`} onClick={() => {
                            setShowButsMenu(lastVal => (lastVal) ? false : true)
                        }}></BiSolidMegaphone>
                        <div>
                            <RxHamburgerMenu className={`hamburger_real ${(show_nav_menu) ? 'hamburger_rotate' : ''}`} onClick={() => {
                                setShowNavMenu(lastVal => (lastVal) ? false : true)
                            }}></RxHamburgerMenu>
                        </div>
                    </div>
                    <div id='nav_buts_menu' style={{
                        display: show_but_menu ? 'block' : 'none'
                    }}>
                        <div id='nav_5' className='navbar_child'>
                            <div className='nav_button2_mob'>
                                <img src={mail_logo} />
                                <button>
                                    EMAIL US
                                </button>
                            </div>
                            <div className='nav_button1_mob'>
                                <img src={website_logo} />
                                <button>
                                    Register News Letter
                                </button>
                            </div>
                            <div className='nav_button1_mob'>
                                <img src={message_logo} />
                                <button>
                                    Message me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mobile_nav_screen' style={{
                opacity: (show_nav_menu) ? '1' : '0',
                pointerEvents: (show_nav_menu) ? 'unset' : 'none'
            }}>
                <div className='nav_menu_title'>
                    <div className='nav_menu_title_text'>
                        Menu
                    </div>
                    <RxCross2 className={`nav_menu_title_logo`} onClick={() => {
                        setShowNavMenu(lastval => (lastval) ? false : true)
                    }}></RxCross2>
                </div>
                <div className='mobile_nav_2'>
                    {anchor_data_mobile.map((data, index) => {
                        return <a
                            className='dactive_nav_a'
                            ref={ele => { mobile_anchor_refs.current.push(ele) }}
                            href={`#${data[1]}`}
                            key={anchor_data_mobile[2]}
                            onClick={() => {
                                setShowNavMenu(lastVal => (lastVal) ? false : true)
                            }}
                        >{data[0]}</a>
                    }
                    )}
                </div>
            </div>
        </div>
    )
}