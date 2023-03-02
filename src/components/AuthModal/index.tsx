import { FC, useState } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import { useDispatch } from "react-redux";
import { AuthDispatcher } from "../../reducers/modules/user-reducer";
import './style.scss'

interface IProps {
    setSignInModalOpen: any;
}

const AuthModal: FC<IProps> = ({ setSignInModalOpen }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);

    const [modalFlag, setModalFlag] = useState(0);
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [show_password, setShow_password] = useState(false);

    const [errorMag, setErrorMag] = useState("");
    const [email_invalid, setUserEmail_invalid] = useState(false);
    const [password_invalid, setPassword_invalid] = useState(false);
    const [confirm_invalid, setConfirm_invalid] = useState(false);
    const [show_confirm_password, setShow_confirm_password] = useState(false);
    const [confirm_password, setConfirm_password] = useState("");

    const restInvalidFlag = () => {
        setErrorMag("");
        setUserEmail_invalid(false);
        setPassword_invalid(false);
        setConfirm_invalid(false);
    }

    const updteModalFlag = (value: number) => {
        setModalFlag(value);
        restInvalidFlag();
    }

    const validate_password = (value: any) => {
        setPassword(value);
    }

    const validate_confirm_password = (value: any) => {
        setConfirm_password(value);
    }

    const handleEye = () => {
        setShow_password(!show_password);
    }

    const handleEye_confirm = () => {
        setShow_confirm_password(!show_confirm_password);
    }

    const handleLogin = async () => {
        restInvalidFlag();
        if (useremail === "") {
            setUserEmail_invalid(true);
        } else if (password === "" || password.toString().length < 4) {
            setPassword_invalid(true);
        } else {
            setPassword_invalid(false);
            try {
                let response = await axios.post(process.env.REACT_APP_BACKURL + "user/login", { email: useremail, password: password });
                console.log("Login handleLogin response : ", response);
                if (response.data.status) {
                    sessionStorage.setItem("token", response.data.data);
                    sessionStorage.setItem("email", response.data.email);
                    authDispatcher.loginSuccess(response.data.data);
                    setSignInModalOpen(false);
                    navigate("/app/memberShip");
                } else {
                    setErrorMag(response.data.data);
                }
            } catch (err: any) {
                console.log("Login handleLogin err : ", err.toString());
                setErrorMag("Authentication failed!");
            }
        }
    }

    const handleRegister = async (e: any) => {
        restInvalidFlag();
        e.preventDefault();
        if (useremail === "") {
            setUserEmail_invalid(true);
        } else if (password === "" || password.toString().length < 4) {
            setPassword_invalid(true);
        } else if (password !== confirm_password) {
            setConfirm_invalid(true);
        }
        else {
            let response = await axios.post(process.env.REACT_APP_BACKURL + "user/register", { email: useremail, password: password });
            try {
                console.log("AuthModal Register response = : ", response);
                if (response.data.status) {
                    // sessionStorage.setItem("email", response.data.data);
                    setModalFlag(-2);
                } else {
                    setErrorMag(response.data.data);
                    // toast.error("Error - Invalid Database Connection!", {autoClose: 1500});
                }
            } catch (error) {
                console.log("AuthModal Register error : ", error);
                // toast.error("Error - Invalid Database Connection!", {autoClose: 1500});
            }
        }
    }

    const resend_confirm_email = async (e: any) => {
        e.preventDefault();
        // let email = sessionStorage.getItem("email");
        let response = await axios.post(process.env.REACT_APP_BACKURL + "user/resend-confirm", { email: useremail });
        try {
            if (response.data.status) {
                sessionStorage.setItem("email", response.data.data);
                setSignInModalOpen(false);
            } else {

            }
        } catch (error) {
            console.log(" Register error : ", error);
            // toast.error("Error - Invalid Database Connection!", {autoClose: 1500});
        }
    }

    const handleUpdatePassword = async (e: any) => {
        e.preventDefault();
        let response = await axios.post(process.env.REACT_APP_BACKURL + "user/forget-password", { email: useremail });
        try {
            if (response.data.status) {
                setErrorMag("Sent password rest link to email!");
                setTimeout(() => {
                    setSignInModalOpen(false)
                }, 1000);
            }
            else {
                setErrorMag(response.data.data);
            }
        } catch (error) {
            console.log(" Register error : ", error);
            setErrorMag("Failed to update password!");
        }
    }

    return (
        <div className="modalBackground">
            <div className="checkout-modalContainer">
                <button className="titleCloseBtn"
                    onClick={() => {
                        setSignInModalOpen(false);
                    }}
                >X</button>
                <Container id="loginform">
                    <Col lg="8" md="6" sm="9" xs="12" className='m-auto'>
                        <div className="d-flex p-0 m-0 mt-1">
                            {
                                modalFlag === 0 && <h2 id="headerTitle">Sign In</h2>
                            }
                            {
                                modalFlag === -1 && <h2 id="headerTitle">Register To</h2>
                            }
                            {
                                modalFlag === -2 && <h2 id="headerTitle">Verify your email address</h2>
                            }
                            {
                                modalFlag === 1 && <h2 id="headerTitle">Forget Password</h2>
                            }
                        </div>
                        {/* {
                            network_invalid && <p className="text-red mb-0">Invalid Network Connection!</p>
                        }
                        {
                            login_invalid && <p className="text-red mb-0">Incorrect useremail or password!</p>
                        }
                        {
                            email_confirm_invalid && <p className="text-red mb-0">Not Verification Email!</p>
                        } */}
                        {
                            modalFlag === -2 && <div className="row mt-4">
                                <h5 className="text-center text-color">Please check your email to complete verification</h5>
                            </div>
                        }
                        {
                            modalFlag !== -2 && <div className="row mt-2">
                                <label>Your Email</label>
                                <div>
                                    <input type="text" placeholder="Enter your username" value={useremail} onChange={(e) => { setUseremail(e.target.value) }} />
                                </div>
                                {
                                    email_invalid && <p className="text-red mb-0">Please input valid email!</p>
                                }
                            </div>
                        }
                        {
                            (modalFlag === 0 || modalFlag === -1) && <div className="row">
                                <label>Your Password</label>
                                <div className="d-flex">
                                    <input type={show_password ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => { validate_password(e.target.value) }} />
                                    {
                                        show_password ? <span onClick={(e) => handleEye()}><FaEyeSlash /></span> : <span onClick={(e) => handleEye()}><FaEye /></span>
                                    }
                                </div>
                                {
                                    password_invalid && <p className="text-red mb-0">Please input valid password!</p>
                                }
                            </div>
                        }
                        {
                            modalFlag === -1 && <div className="row">
                                <label>Confirm Password</label>
                                <div className="d-flex">
                                    <input type={show_confirm_password ? "text" : "password"} placeholder="Enter confirm password" value={confirm_password} onChange={(e) => { validate_confirm_password(e.target.value) }} />
                                    {
                                        show_confirm_password ? <span onClick={(e) => handleEye_confirm()}><FaEyeSlash /></span> : <span onClick={(e) => handleEye_confirm()}><FaEye /></span>
                                    }
                                </div>
                                {
                                    confirm_invalid && <p className="text-red mb-0">Confirm Password is different with password</p>
                                }
                            </div>
                        }
                        {
                            errorMag !== "" && <div className="row pt-1">
                                <p className="text-red mb-0">{errorMag}</p>
                            </div>
                        }
                        <br></br>
                        <div id="button" className="row text-center">
                            {
                                modalFlag === 0 && <button onClick={() => handleLogin()}>Sign In</button>
                            }
                            {
                                modalFlag === -1 && <button onClick={(e) => handleRegister(e)}>Register</button>
                            }
                            {
                                modalFlag === -2 && <button onClick={(e) => resend_confirm_email(e)}>RESEND</button>
                            }
                            {
                                modalFlag === 1 && <button onClick={(e) => handleUpdatePassword(e)}>Email Me</button>
                            }
                            <Row className="p-0 ml-0 mr-0 mt-4">
                                <div className="d-flex p-0 m-0">
                                    {
                                        modalFlag === 0 && <>
                                            <label className="normal-font-size" onClick={() => updteModalFlag(-1)}>Don't have an account?</label>
                                            <label className="normal-font-size ml-auto" onClick={() => updteModalFlag(1)}>Forget Password?</label>
                                        </>
                                    }
                                    {
                                        modalFlag === -1 && <>
                                            <label className="normal-font-size" onClick={() => updteModalFlag(0)}>Already have an account?</label>
                                        </>
                                    }
                                    {
                                        modalFlag === 1 && <>
                                            <label className="normal-font-size" onClick={() => updteModalFlag(0)}>Back to Login</label>
                                        </>
                                    }
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Container>
            </div>
        </div>
    );
};
export default AuthModal
