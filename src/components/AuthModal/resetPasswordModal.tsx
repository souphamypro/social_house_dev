import { FC, useState } from 'react';
import { Col, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import './style.scss'

interface IProps {
    setResetPasswordModalOpen: any;
    email: string;
}

const ResetPasswordModal: FC<IProps> = ({ setResetPasswordModalOpen, email }) => {

    const [errorMag, setErrorMag] = useState("");
    const [password, setPassword] = useState("");
    const [show_password, setShow_password] = useState(false);
    const [confirm_password, setConfirm_password] = useState("");
    const [show_confirm_password, setShow_confirm_password] = useState(false);

    // const [password_invalid, setPassword_invalid] = useState(false);
    // const [confirm_invalid, setConfirm_invalid] = useState(false);

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

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setErrorMag("");
        console.log("ResetPassword handleResetPassword password = : ", password, confirm_password);
        if (password === "") {
            setErrorMag("Please input valid password!");
        } else if (password !== confirm_password) {
            setErrorMag("Please input correct confirm password!");
        } else {
            let response = await axios.post(process.env.REACT_APP_BACKURL + "user/update-user", { email: email, password: password });
            try {
                if (response.data.status) {
                    setErrorMag("Password is updated!");
                    setTimeout(() => {
                        setResetPasswordModalOpen(false);
                        window.open(process.env.REACT_APP_FRONTENDURL?.toString(), "_self");
                    }, 1500);
                }
                else {
                    setErrorMag(response.data.data);
                }
            } catch (error) {
                console.log("ResetPassword handleResetPassword error = : ", error);
                setErrorMag("Failed to update password!");
            }
        }
    }

    return (
        <div className="modalBackground">
            <div className="checkout-modalContainer">
                <button className="titleCloseBtn"
                    onClick={() => {
                        setResetPasswordModalOpen(false);
                    }}
                >X</button>
                <Container id="loginform">
                    <Col lg="8" md="6" sm="9" xs="12" className='m-auto'>
                        <div className="d-flex p-0 m-0 mt-1">
                            <h2 id="headerTitle">Reset Password</h2>
                        </div>
                        <div className="row">
                            <label>New Password</label>
                            <div className="d-flex">
                                <input type={show_password ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => { validate_password(e.target.value) }} />
                                {
                                    show_password ? <span onClick={(e) => handleEye()}><FaEyeSlash /></span> : <span onClick={(e) => handleEye()}><FaEye /></span>
                                }
                            </div>
                            {/* {
                                password_invalid && <p className="text-red mb-0">Password is invalid (should be long than 4)</p>
                            } */}
                        </div>
                        <div className="row">
                            <label>Confirm New Password</label>
                            <div className="d-flex">
                                <input type={show_confirm_password ? "text" : "password"} placeholder="Enter confirm password" value={confirm_password} onChange={(e) => { validate_confirm_password(e.target.value) }} />
                                {
                                    show_confirm_password ? <span onClick={(e) => handleEye_confirm()}><FaEyeSlash /></span> : <span onClick={(e) => handleEye_confirm()}><FaEye /></span>
                                }
                            </div>
                            {/* {
                                confirm_invalid && <p className="text-red mb-0">Confirm Password is different with password</p>
                            } */}
                        </div>
                        {
                            errorMag !== "" && <div className="row pt-1">
                                <p className="text-red mb-0">{errorMag}</p>
                            </div>
                        }
                        <div id="button" className="row text-center">
                            <button onClick={(e) => handleResetPassword(e)}>Reset Password</button>
                            <label className="normal-font-size mt-3" onClick={() => setResetPasswordModalOpen(false)}>Back to Login</label>
                        </div>
                    </Col>
                </Container>
            </div>
        </div>
    );
};

export default ResetPasswordModal
