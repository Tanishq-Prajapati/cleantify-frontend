import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from './components/navbar/Navbar';
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { FaEnvelope, FaArrowUp } from "react-icons/fa6";
import { AiOutlineForm, AiFillMessage } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SpinnerCircularFixed } from "spinners-react"
import axios from 'axios';

// importing all The Recaptcha Stuffs here
import ReCAPTCHA from 'react-google-recaptcha';

// importing all the JS Files here
import { serviceCheckers } from "./utility/data/ServicesData"

// importing all the css files here
import "./App.css";
import Footer from './components/footer/Footer';

const App = () => {
  // getting all the welcome logos here
  const traffic_logo = require("./utility/images/icons/traffic.png");
  const leads_logo = require("./utility/images/icons/leads.png");
  const money_logo = require("./utility/images/icons/money.png");
  const line_logo = require("./utility/images/icons/line.png");

  // -- Getting all the about us logos here
  const bicep_logo = require("./utility/images/icons/about_us/Bicep.png");
  const handshake_logo = require("./utility/images/icons/about_us/Handshake.png");
  const headset_logo = require("./utility/images/icons/about_us/Headset Help.png");
  const b_line_logo = require("./utility/images/icons/about_us/b_line.png");
  const logo_text = require("./utility/images/logo/logo_text.png")
  const logo = require("./utility/images/logo/logo.png")

  // Getting all the about us How logos here
  const brain_logo = require("./utility/images/icons/about_us/Brain Research.png");
  const gear_logo = require("./utility/images/icons/about_us/Gear Alt M.png");

  // getting all the about us section images
  const about_sec_img = require("./utility/images/img2.jpg")

  // getting all the Portfolio IMAGES here
  const portfolio1 = require("./utility/images/portfolio/1.png");
  const portfolio2 = require("./utility/images/portfolio/2.png");
  const portfolio3 = require("./utility/images/portfolio/3.png");
  const portfolio4 = require("./utility/images/portfolio/4.png");
  const portfolio5 = require("./utility/images/portfolio/5.png");
  const portfolio6 = require("./utility/images/portfolio/6.png");
  const portfolio7 = require("./utility/images/portfolio/7.png");

  // adding all the useRef's
  const welcome_referrer = useRef();
  const top_fab = useRef();
  const cursor_position = useRef();

  // adding all the variables here related to captcha
  const captchaRef = useRef();

  // all form related variables are here
  const [formSent, setFormSent] = useState(false);
  const [oneTimeFab, setOneTimeFab] = useState(false);
  const [oneTimeTab, setOneTimeTab] = useState(false);
  const [mouseCords, setMouseCords] = useState({
    x: 0,
    y: 0
  })

  const [userInputData, setInputData] = useState({
    first_name: "",
    surname: "",
    email: "",
    message: "",
    company_name: ""
  })

  const [errors, setErrors] = useState({
    fname: null,
    sname: null,
    email: null,
    cname: null,
    mess: null,
    captcha: null
  })

  // getting all the Contact-us Photos her
  const contact_us_back = require("./utility/images/img1.jpg");

  // getting all the Our-Services Icons here
  const check_icon = require("./utility/images/icons/check_circle.png")
  const check_icon_b = require("./utility/images/icons/check_circle_b.png")

  // is scrolled function here
  const isScrolled = () => {
    if (window.scrollY >= 150) {
      setOneTimeFab(true)
      try {
        top_fab.current.className = 'fab_top_start';
      }
      catch (e) { }
    } else {
      try {
        top_fab.current.className = 'fab_top_exits';
      }
      catch (e) { }
    }
  }

  // adding a function that gives me captcha value
  const getCaptchaValue = () => {
    return captchaRef.current.getValue();
  }

  // adding a function that resests captcha token
  const resetCaptchaValue = () => {
    captchaRef.current.reset();
  }

  // adding a function that checks if token is valid or not
  const isCaptchaGood = (token) => {
    if (token === "") {
      return false;
    }
    console.log("YEAAAAAAS");
    return true;
  }

  const setAllErrorsNull = () => {
    setErrors({
      fname: null,
      sname: null,
      cname: null,
      mess: null,
      captcha: null
    })
  }


  // Free LIVE CHAT CODE

  // useEffect(() => {
  //   var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //   (function () {
  //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/65d4af128d261e1b5f62bc82/1hn3cnotg';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // })

  const onFormSubmit = async (e) => {
    // checking if form is already sented
    if (formSent) return true;
    setFormSent(true)
    setAllErrorsNull();
    // all errors are now set to null here
    console.log(userInputData, "hellow");
    e.preventDefault()
    // now getting the token of Captcha
    let token = getCaptchaValue();
    console.log(token);
    if (!isCaptchaGood(token)) {
      // now captcha error detected
      setErrors({
        ...errors,
        captcha: "CAPTCHA must be verified to submit form"
      })
      setFormSent(false)
      console.log("SD");
      return false;
    }
    // else now sending the data using function data_sender
    console.log("Sending reqeust...");
    await dataSender(token)
    resetCaptchaValue();
    setFormSent(false)
  }

  // sending the backend request functions here
  const dataSender = async (
    captcha_token
  ) => {
    // sending the form data to the server backend
    setAllErrorsNull()
    // sending the data through the use of axios here
    console.log(captcha_token);
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/contact`,
      {
        first_name: userInputData.first_name,
        surname: userInputData.surname,
        email: userInputData.email,
        company_name: userInputData.company_name,
        message: userInputData.message
      },
      {
        headers: {
          Authorization: captcha_token
        }
      }
    ).then((resp) => {
      console.log(resp.data);
      // now checking if the response is
      let resp_data = resp.data;
      // creating a object with temp errors
      let tempErrors = {
        cname: null,
        fname: null,
        sname: null,
        email: null,
        mess: null
      }
      if (!resp_data.success) {
        // errors detected
        // 1. checking if error is by captcha
        if (resp_data.error.captcha_error) {
          toast.error(resp_data.error.captcha_error)
        }
        if (resp_data.error.company_name) {
          tempErrors.cname = resp_data.error.company_name
        }

        if (resp_data.error.fname) {
          tempErrors.fname = resp_data.error.fname
        }

        if (resp_data.error.sname) {
          tempErrors.sname = resp_data.error.sname
        }

        if (resp_data.error.email) {
          tempErrors.email = resp_data.error.email
        }

        if (resp_data.error.message) {
          tempErrors.mess = resp_data.error.message
        }
        // adding a toast saying error in inputs
        toast.error('Invalid details entered in form')
      }
      else {
        toast.success('Congrats form submitted')
      }
      // now changing the state
      setErrors({
        ...tempErrors,
        captcha: null
      })
      console.log(errors);
    }).catch((e) => {
      alert(e)
    })
  }

  // adding the useEffect function here
  useEffect(() => {
    window.addEventListener('scroll', isScrolled)

    const mobileScreen = window.matchMedia('(max-width:810px)')
    if (!mobileScreen.matches) {
      // adding the front-tab timeout here
      const showOneTab = setTimeout(() => {
        setOneTimeTab(true)
      }, 10000)
    }

    // making the cursor move here
    return () => {
      window.removeEventListener('scroll', isScrolled)
      // clearing tab timeout in intentional re-render
      if (!mobileScreen.matches) {
        // adding the front-tab timeout here
        clearInterval(setOneTimeTab)
      }
    }
  }, [])

  return (
    <div
      className='App App_computer'
      onMouseMove={(event) => {
        // changing the state of the mouse here
        setMouseCords({
          x: `${event.clientX - 17.5}px`,
          y: `${event.clientY - 17.5}px`
        })
      }}
    >
      <Navbar></Navbar>
      <div className='welcome' id='welcome' ref={welcome_referrer}>
        <div className='welcome_wrapper'>
          <div className='welcome_head_cont'>
            <div className='welcome_head'>
              We, Help Cleaning <br /> Businesses Improve online
            </div>
            <div className='welcome_benefits'>
              <div className='a_welcome_benefit'>
                <img src={traffic_logo} />
                <div className='a_welcome_benefit_text'>
                  More Traffic
                </div>
              </div>
              <div className='benefit_divider'>
                <img src={line_logo} />
              </div>
              <div className='a_welcome_benefit'>
                <img src={leads_logo} />
                <div className='a_welcome_benefit_text'>
                  Quality Leads
                </div>
              </div>
              <div className='benefit_divider'>
                <img src={line_logo} />
              </div>
              <div className='a_welcome_benefit'>
                <img src={money_logo} />
                <div className='a_welcome_benefit_text'>
                  Quality Closing
                </div>
              </div>
            </div>
            <div className='welcome_sub_head'>
              Built for cleaners, living for cleanershelping cleaning companies and small businesses to improve their online and digital image and land high ticket leads.
            </div>
            <button className='welcome_but'>
              Explore Sections
            </button>
          </div>
        </div>
        <div className='welcome_end'>
          <div className='welcome_end_wrapper'>
            <div className='welcome_end_wrapper_text'>
              Explore our website, see sections
            </div>
            <button className='welcome_end_wrapper_button'>
              Redirect to sections
            </button>
          </div>
        </div>
      </div>
      <div className='about_us' id='about_us'>
        <div className='about_us_wrapper'>
          <div className='about_us_wrapper_1'>
            <div className='about_us_wrapper_prehead'>
              ABOUT US <div style={{ width: '70px', height: '7px', backgroundColor: 'black', borderRadius: '10px' }}></div>
            </div>
            <div className='about_us_wrapper_head'>
              We, are the best Marketing choice for your cleaning business
            </div>
            <div className='about_us_wrapper_subhead'>
              Welcome to <span className='big_boy_word'>Cleantify</span>  your dedicated partner for web design and marketing solutions tailored specifically for the cleaning industry. With our expertise, we help cleaning businesses establish a strong online presence and achieve growth. Let us transform your vision into reality and propel your business forward
            </div>
            <div className='about_us_wrapper_trust'>
              <div className='a_about_us_wrapper_trust'>
                <img
                  src={handshake_logo}
                />
                <div className='a_about_us_trust_text'>
                  Most Trusted
                </div>
              </div>
              <div className='benefit_divider'>
                <img src={b_line_logo} />
              </div>
              <div className='a_about_us_wrapper_trust'>
                <img
                  src={bicep_logo}
                />
                <div className='a_about_us_trust_text'>
                  Most Capable
                </div>
              </div>
              <div className='benefit_divider'>
                <img src={b_line_logo} />
              </div>
              <div className='a_about_us_wrapper_trust'>
                <img
                  src={headset_logo}
                />
                <div className='a_about_us_trust_text'>
                  Most Helpfull
                </div>
              </div>
            </div>
          </div>
          <div className='about_us_wrapper_2'>
            <img src={about_sec_img}></img>
          </div>
        </div>
        <div className='about_us_steps_wrapper'>
          <div className='a_about_us_step'>
            <div className='a_about_us_step_pre_head'>
              01
            </div>
            <div className='a_about_us_step_head'>
              Website Design
            </div>
            <div className='a_about_us_step_sub_head'>
              At Cleantify, we specialize in crafting visually captivating and user-friendly websites designed specifically for cleaning businesses. Our expert team ensures your site reflects your brand identity and provides an exceptional user experience.
            </div>
            <button>See Services</button>
          </div>
          <div className='a_about_us_step'>
            <div className='a_about_us_step_pre_head'>
              02
            </div>
            <div className='a_about_us_step_head'>
              LOCAL SEO
            </div>
            <div className='a_about_us_step_sub_head'>
              Boost your visibility in your local area with our Local SEO services at Cleantify. Our team specializes in optimizing your online presence to ensure that your cleaning business stands out in local search results. Let us take care of the technical details so you can focus on growing your business locally.
            </div>
            <button>See Services</button>
          </div>
          <div className='a_about_us_step'>
            <div className='a_about_us_step_pre_head'>
              03
            </div>
            <div className='a_about_us_step_head'>
              MARKETING
            </div>
            <div className='a_about_us_step_sub_head'>
              Drive growth for your cleaning business with our specialized marketing solutions at Cleantify From targeted campaigns to engaging content strategies, our team is dedicated to elevating your brand and reaching your ideal customers. Let us craft a customized marketing plan tailored to your goals, so you can achieve maximum impact and grow your business effectively.
            </div>
            <button>See Services</button>
          </div>
        </div>
        <div className='about_us_how_we_work' id='about_us_how_we_work'>
          <div className='about_us_how_we_work_start'>
            <div className='about_us_how_prehead'>
              Our process
            </div>
            <div className='about_us_how_head'>
              How we work to meet <br /> your needs ?
            </div>
          </div>
          <div className='about_us_how_steps'>
            <div className='about_us_how_1'>
              <div className='a_about_us_how_step'>
                <div className='a_about_us_how_step_prehead'>
                  01
                </div>
                <div className='a_about_us_how_step_logo'>
                  <img src={brain_logo} />
                </div>
                <div className='a_about_us_how_step_head'>
                  Identifying
                </div>
                <div className='a_about_us_how_step_para'>
                  in the first step of our process, we dive deep into understanding your cleaning business's unique strengths, challenges, and goals. Through comprehensive analysis and consultation, we pinpoint key opportunities for growth and development. By identifying your specific needs and objectives, we lay the groundwork for a tailored strategy that ensures success.
                </div>
              </div>
              <div className='a_about_us_how_step'>
                <div className='a_about_us_how_step_prehead'>
                  02
                </div>
                <div className='a_about_us_how_step_logo'>
                  <img src={brain_logo} />
                </div>
                <div className='a_about_us_how_step_head'>
                  Planning
                </div>
                <div className='a_about_us_how_step_para'>
                  we leverage the insights gathered from the identification stage to develop a strategic roadmap tailored to your cleaning business. Our experienced team collaborates closely with you to outline clear objectives, milestones, and tactics. From defining target audiences to outlining messaging frameworks, we meticulously plan every aspect of your web design, marketing, and SEO efforts.
                </div>
              </div>
            </div>
            <div className='about_us_how_2'>
              <div className='about_us_wrapper_2' id='how_wrapper_2'>
                <div className='about_us_wrapper_prehead'>
                  OUR STEPS <div style={{ width: '70px', height: '7px', backgroundColor: 'black', borderRadius: '10px' }}></div>
                </div>
                <div className='about_us_wrapper_head'>
                  OUR STREAMLINED PROCESS Makes everything WORK simple.
                </div>
                <div className='about_us_wrapper_subhead' id='how_wrapper_subhead'>
                  Bringing together the power of identification, planning, and action, our approach at [Your Agency Name] is designed to propel your cleaning business towards unparalleled success. By understanding your unique needs, meticulously planning each step, and executing with precision, we create a pathway to growth and achievement. With our dedicated team by your side, you can trust that every aspect of your web design, marketing, and SEO initiatives will be handled with expertise and care. Let us be your partner in realizing your vision and unlocking the full potential of your cleaning business.
                </div>
                <div className='about_us_wrapper_trust'>
                  <div className='a_about_us_wrapper_trust'>
                    <img
                      src={handshake_logo}
                    />
                    <div className='a_about_us_trust_text'>
                      Most Trusted
                    </div>
                  </div>
                  <div className='benefit_divider'>
                    <img src={b_line_logo} />
                  </div>
                  <div className='a_about_us_wrapper_trust'>
                    <img
                      src={bicep_logo}
                    />
                    <div className='a_about_us_trust_text'>
                      Most Capable
                    </div>
                  </div>
                  <div className='benefit_divider'>
                    <img src={b_line_logo} />
                  </div>
                  <div className='a_about_us_wrapper_trust'>
                    <img
                      src={headset_logo}
                    />
                    <div className='a_about_us_trust_text'>
                      Most Helpfull
                    </div>
                  </div>
                </div>
              </div>
              <div className='a_about_us_how_step'>
                <div className='a_about_us_how_step_prehead'>
                  03
                </div>
                <div className='a_about_us_how_step_logo'>
                  <img src={gear_logo} />
                </div>
                <div className='a_about_us_how_step_head'>
                  Action
                </div>
                <div className='a_about_us_how_step_para'>
                  we bring our meticulously crafted plan to life. Our dedicated team of designers, marketers, and SEO specialists work seamlessly to execute each aspect of the strategy with precision and efficiency. Whether it's developing a visually captivating website, launching targeted marketing campaigns, or optimizing your online presence for local search, we take decisive action to achieve your goals.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='our_tech'>
        <div className='our_tech_wrapper'>
          <div className='our_tech_head_wrap'>
            <div className='our_tech_head_bar'></div>
            <div className='our_tech_head'>
              Can WORK WITH ALL <br></br>SORTS OF <span style={{ color: 'rgba(255,152,0,1)' }}>TECHNOLOGIES</span>
            </div>
            <div className='our_tech_head_bar_revert'></div>
          </div>
          <div className='our_techs'>
            <div className='a_tech'>
              <div className='a_tech_wrapper'>
                <div className='a_tech_icon'>
                  <i class="fa-brands fa-react"></i>
                </div>
                <div className='a_tech_head'>
                  Custom development
                </div>
                <div className='a_tech_para'>
                  Custom development involves creating websites from scratch, tailoring every aspect to meet the unique needs and preferences of clients. Our agency excels in custom development, offering bespoke solutions that are meticulously crafted to reflect the branding, functionality, and user experience desired by cleaning companies and businesses. With custom development, we have the flexibility to implement complex features, integrate specific functionalities, and ensure optimal performance, scalability, and security for our clients' websites.
                </div>
              </div>
            </div>
            <div className='a_tech'>
              <div className='a_tech_wrapper'>
                <div className='a_tech_icon'>
                  <i class="fa-brands fa-webflow"></i>
                </div>
                <div className='a_tech_head'>
                  WEB BUILDERS
                </div>
                <div className='a_tech_para'>
                  Website builders provide a user-friendly platform for creating websites without the need for coding skills. At our agency, we leverage advanced website builders to rapidly design and deploy professional-grade websites for cleaning companies and businesses. With drag-and-drop interfaces, pre-designed templates, and intuitive customization options, website builders streamline the development process, allowing us to deliver stunning websites efficiently. We harness the power of website builders to empower our clients with easy-to-manage websites that maintain high standards of design and functionality.
                </div>
              </div>
            </div>
            <div className='a_tech'>
              <div className='a_tech_wrapper'>
                <div className='a_tech_icon'>
                  <i class="fa-brands fa-wordpress"></i>
                </div>
                <div className='a_tech_head'>
                  WORDPRESS
                </div>
                <div className='a_tech_para'>
                  Our agency excels in WordPress development, harnessing its flexibility, scalability, and extensive plugin ecosystem to craft dynamic websites for cleaning companies and businesses. With WordPress, we offer seamless content management, flexible customization, and integration with third-party services, ensuring our clients' needs are met and their expectations surpassed, whether it's informational websites, e-commerce platforms, or interactive blogs.                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='our_services' id='our_services'>
        <div className='our_services_wrapper'>
          <div className='our_services_cont'>
            <div className='our_services_cont_man'>
              <div className='our_services_cont_man_prehead'>
                Our Services ?
              </div>
              <div className='our_services_cont_man_head'>
                GOAL IS TO MAKE YOU CLEANING BUSINESS KING
              </div>
              <div className='our_services_cont_man_subhead'>
                Our tailored services for commercial cleaning companies are designed to elevate your business to new heights. From crafting professional websites that showcase your expertise to implementing targeted marketing strategies that attract high-value clients, we've got you covered. Whether you're a small startup or a well-established enterprise, our team is dedicated to helping you stand out in the competitive commercial cleaning industry. Let us handle the digital aspect of your business so you can focus on delivering exceptional service to your clients.
              </div>
            </div>
            <div className='a_our_services_wrapper'>
              <div className='a_our_serivice'>
                <div className='a_our_service_head'>
                  Web Design
                </div>
                <div className='a_our_service_subhead'>
                  Elevate your commercial cleaning company's online presence with our specialized web design services tailored specifically for the industry. Our team understands the unique needs of commercial cleaning businesses, from showcasing your range of services to highlighting your expertise and professionalism
                </div>
                <div className='a_our_service_check'>
                  {/* This bottom div will be in a loop of datas */}
                  {serviceCheckers.web_design.map((ele, idx) => {
                    return <div className='a_service_check'>
                      <img src={check_icon_b}></img>
                      <div className='a_service_check_text'>
                        {ele}
                      </div>
                    </div>
                  })}
                </div>
              </div>
              <div className='a_our_serivice'>
                <div className='a_our_service_head'>
                  Local SEO
                </div>
                <div className='a_our_service_subhead'>
                  Elevate your commercial cleaning company's online presence with our specialized web design services tailored specifically for the industry. Our team understands the unique needs of commercial cleaning businesses, from showcasing your range of services to highlighting your expertise and professionalism
                </div>
                <div className='a_our_service_check'>
                  {/* This bottom div will be in a loop of datas */}
                  {serviceCheckers.seo.map((ele, idx) => {
                    return <div className='a_service_check'>
                      <img src={check_icon_b}></img>
                      <div className='a_service_check_text'>
                        {ele}
                      </div>
                    </div>
                  })}
                </div>
              </div>
              <div className='a_our_serivice'>
                <div className='a_our_service_head'>
                  Marketing
                </div>
                <div className='a_our_service_subhead'>
                  Elevate your commercial cleaning company's online presence with our specialized web design services tailored specifically for the industry. Our team understands the unique needs of commercial cleaning businesses, from showcasing your range of services to highlighting your expertise and professionalism
                </div>
                <div className='a_our_service_check'>
                  {/* This bottom div will be in a loop of datas */}
                  {serviceCheckers.marketing.map((ele, idx) => {
                    return <div className='a_service_check'>
                      <img src={check_icon_b}></img>
                      <div className='a_service_check_text'>
                        {ele}
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='our-portfolio'>
        <div className='our-portfolio-wrapper'>
          <div className='our_tech_head_wrap'>
            <div className='our_tech_head_bar'></div>
            <div className='our_tech_head'>
              Our Design <br></br> <span style={{
                fontSize: '40px'
              }}>portfolio</span>
            </div>
            <div className='our_tech_head_bar_revert'></div>
          </div>
          <div className='our-portfolio-main'>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio2}></img>
              </div>
              <div className='a-portfolio-head'>
                Kleaner Stop
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio1}></img>
              </div>
              <div className='a-portfolio-head'>
                Cleaning One
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio3}></img>
              </div>
              <div className='a-portfolio-head'>
                Cleaning Company
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
        </div>
        <div className='our-portfolio-wrapper'>
          <div className='our_tech_head_wrap'>
            <div className='our_tech_head_bar'></div>
            <div className='our_tech_head'>
              Other Web Designs <br></br> <span style={{
                fontSize: '40px'
              }}>portfolio</span>
            </div>
            <div className='our_tech_head_bar_revert'></div>
          </div>
          <div className='our-portfolio-main'>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio4}></img>
              </div>
              <div className='a-portfolio-head'>
                Topic Listintg
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio5}></img>
              </div>
              <div className='a-portfolio-head'>
                Course Selling
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio6}></img>
              </div>
              <div className='a-portfolio-head'>
                Furniture Company
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className='a-portfolio'>
              <div className='a-portfolio-img'>
                <img src={portfolio7}></img>
              </div>
              <div className='a-portfolio-head'>
                Tanishq's Portfolio
              </div>
              <div className='a-portfolio-para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='contact-us' id='contact-us'>
        <div className='our_tech_head_wrap' style={{
          width:'90%',
          margin:'auto',
          marginBottom:'90px'
        }}>
          <div className='our_tech_head_bar'></div>
          <div className='our_tech_head'>
            <span style={{
              fontSize:'45px'
            }}>Contact US</span>
          </div>
          <div className='our_tech_head_bar_revert'></div>
        </div>
        <div className='contact-us-cont'>
          <div className='contact-us-1'>
            <div className='contact-us-1-cont'>
              <div className='contact-us-1-head'>
                ALl Contact Ways
              </div>
              <div className='contact-us-1-subhead'>
                Have questions or ready to take the next step? We'd love to hear from you! Feel free to reach out to us via phone, email, or the contact form below. Our friendly team is here to assist you with any inquiries, discuss your project needs, or schedule a consultation. Let's connect and explore how we can help your cleaning business thrive in the digital world.
              </div>
              <div className='contact-us-1-ways'>
                <div className='contact-us-1-a-way'>
                  <div className='a-way-logo'>
                    <FaPhoneAlt></FaPhoneAlt>
                  </div>
                  <div className='a-way-head'>
                    +919343201630
                  </div>
                </div>
                <div className='contact-us-1-a-way'>
                  <div className='a-way-logo'>
                    <FaEnvelope></FaEnvelope>
                  </div>
                  <div className='a-way-head'>
                    fireeyes634@gmail.com
                  </div>
                </div>
                <div className='contact-us-1-a-way'>
                  <div className='a-way-logo'>
                    <AiOutlineForm></AiOutlineForm>
                  </div>
                  <div className='a-way-head'>
                    Fill the form
                  </div>
                </div>
              </div>
              <div className='social-media-icons'>
                <FaInstagram className='a-social-icon'></FaInstagram>
                <FaFacebookF className='a-social-icon'></FaFacebookF>
                <FaTwitter className='a-social-icon'></FaTwitter>
              </div>
            </div>
          </div>
          <div className='contact-us-2'>
            <div className='contact-us-2-cont'>
              <form
                onSubmit={onFormSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                <div className='form-head'>
                  Message Us
                </div>
                <div className='form-section-1'>
                  <div className='form-input-wrapper'>
                    <div className='form-input-head'>First Name</div>
                    <input
                      className='form-input'
                      placeholder='Enter first name'
                      onInput={(e) => {
                        if (errors.fname) {
                          setErrors({
                            ...errors,
                            fname: null
                          })
                        }
                        setInputData({
                          ...userInputData,
                          first_name: e.currentTarget.value
                        })
                      }}
                    ></input>
                    {errors.fname && <div className='errors'>{errors.fname}</div>}
                  </div>
                  <div className='form-input-wrapper'>
                    <div className='form-input-head'>Last Name</div>
                    <input
                      className='form-input'
                      placeholder='Enter last name'
                      onInput={(e) => {
                        if (errors.sname) {
                          setErrors({
                            ...errors,
                            sname: null
                          })
                        }
                        setInputData({
                          ...userInputData,
                          surname: e.currentTarget.value
                        })
                      }}
                    ></input>
                    {errors.sname && <div className='errors'>{errors.sname}</div>}
                  </div>
                </div>
                <div className='form-input-wrapper'>
                  <div className='form-input-head'>Email</div>
                  <input
                    className='form-input'
                    type='email'
                    placeholder='Enter email here'
                    onInput={(e) => {
                      if (errors.email) {
                        setErrors({
                          ...errors,
                          email: null
                        })
                      }
                      setInputData({
                        ...userInputData,
                        email: e.currentTarget.value
                      })
                    }}
                  ></input>
                  {errors.email && <div className='errors'>{errors.email}</div>}
                </div>
                <div className='form-input-wrapper'>
                  <div className='form-input-head'>Company Name</div>
                  <input
                    className='form-input'
                    placeholder='Enter company name'
                    onInput={(e) => {
                      if (errors.cname) {
                        setErrors({
                          ...errors,
                          cname: null
                        })
                      }
                      setInputData({
                        ...userInputData,
                        company_name: e.currentTarget.value
                      })
                    }}
                  ></input>
                  {errors.cname && <div className='errors'>{errors.cname}</div>}
                </div>
                <div className='form-input-wrapper'>
                  <div className='form-input-head'>Message</div>
                  <textarea
                    className='area-input'
                    placeholder='Enter Message here'
                    onInput={(e) => {
                      if (errors.mess) {
                        setErrors({
                          ...errors,
                          mess: null
                        })
                      }
                      setInputData({
                        ...userInputData,
                        message: e.currentTarget.value
                      })
                    }}
                  ></textarea>
                  {errors.mess && <div className='errors'>{errors.mess}</div>}
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                ></ReCAPTCHA>
                {formSent ? <button type='submit'><SpinnerCircularFixed size={25} speed={160} color='white'></SpinnerCircularFixed></button> : <button type='submit'>Send Message <FaTelegramPlane size={20}></FaTelegramPlane></button>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer
        position='bottom-left'
        hideProgressBar={false}
        closeOnClick
        theme='light'
      ></ToastContainer>
      <a id='fab' href='#contact-us'>
        <AiFillMessage></AiFillMessage>
      </a>
      {oneTimeFab && <a id='fab_top' className='' ref={top_fab} href='#welcome'>
        <FaArrowUp></FaArrowUp>
      </a>}
      <div className='abs-form-section' style={{
        opacity: oneTimeTab ? '1' : '0',
        pointerEvents: !oneTimeTab ? 'none' : 'unset'
      }}>
        <div className='abs-form-section-wrapper'>
          <div className='abs-form-comp abs-form-section-first'>
            <div className='abs-form-section-cont abs-form-section-first-cont'>
              <div id='nav_1' className='navbar_child navbar-logo-app'>
                <img src={logo}></img>
                <img src={logo_text}></img>
              </div>
            </div>
          </div>
          <div className='abs-form-comp'>
            <RxCross2 className='abs-form-cross' onClick={() => {
              setOneTimeTab(oneTimeTab ? false : true)
            }}></RxCross2>
            <div className='abs-form-section-cont abs-form-section-second-cont'>
              <div className='abs-form-head'>
                We are, here for you always
              </div>
              <div className='abs-form-para'>
                If you are an cleaning buisness owner or company we are here for you to transform your
                online and digital image massively
              </div>
              <div className='abs-form-buts'>
                <button onClick={() => {
                  window.location.href = `https://cleantify.com/#contact-us`
                  setOneTimeTab(oneTimeTab ? false : true)
                }}>Message us</button>
                <div className='abs-form-but-divider'>
                  <div className='abs-form-but-divider-text'>
                    and
                  </div>
                </div>
                <button>News Letter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='intro-logo-section'>
        <div className='intro-logo-wrapper'>
          <div className='intro-logo'>
            <div id='nav_1' className='navbar_child intro-nav-logo'>
              <img src={logo}></img>
              <img src={logo_text}></img>
            </div>
          </div>
        </div>
      </div>
      <div
        className='best_cursor'
        ref={cursor_position}
        style={{
          top: mouseCords.y,
          left: mouseCords.x
        }}
      ></div>
    </div>
  )
}
export default App