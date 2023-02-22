import { FC, useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import NavBar from '../../components/NavBar'
import Home from '../Home'
import VenusList from '../VenusList'

import JoinNowModal from "../../components/JoinNowModal";
import WaitListModal from "../../components/WaitListModal";
import './style.scss'
import CheckoutModal from '../../components/CheckoutModal';
import AuthModal from '../../components/AuthModal';
import ResetPasswordModal from '../../components/AuthModal/resetPasswordModal';


const Root: FC = () => {

    const [searchParams] = useSearchParams();

    const [userEmail, setUserEmail] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [waitlistShow, setWaitListShow] = useState(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

    const onClickWaitList = () => {
        setModalOpen(false);
        setWaitListShow(true);
    }

    useEffect(() => {
        try {
            if (window.location.href.toString().includes("reset")) {
                let data = searchParams.get("data");
                let query = searchParams.get("query");
                console.log(data, query);
                axios.post(process.env.REACT_APP_BACKURL + "user/reset-check", { data: data })
                    .then((res) => {
                        console.log(res);
                        if (res.data.status) {
                            setUserEmail(res.data.data);
                            setResetPasswordModalOpen(true);
                        } else {
                            toast.error(res.data.data, { autoClose: 1500 });
                        }
                    })
                    .catch((err) => {
                        console.log("Reset useEffect err = : ", err);
                        setTimeout(() => {
                            // navigate("/login");
                        }, 1000);
                    })
            } else if (window.location.href.toString().includes("email")) {
                let email = searchParams.get("email");
                let confirmation = searchParams.get("key");
                // let email = window.location.href.split("?email=")[1].split("&")[0];
                // let confirmation = window.location.href.split("&key=")[1];
                if (confirmation !== null && confirmation !== undefined && email !== null && email !== undefined) {
                    axios.post(process.env.REACT_APP_BACKURL + "user/email-verification", { email: email, confirmation: confirmation })
                        .then((res) => {
                            console.log("Root UseEffect res = : ", res);
                            if (res.data.status) {
                                toast.success(res.data.data, { autoClose: 1500 });
                                setTimeout(() => { window.open(process.env.REACT_APP_FRONTENDURL?.toString(), "_self"); }, 2000);
                            } else {
                                toast.error(res.data.data, { autoClose: 1500 });
                            }
                        })
                        .catch((err) => {
                            console.log("Root UseEffect err = : ", err);
                            toast.error("Invalid Database Connection!", { autoClose: 1500 });
                            setTimeout(() => { window.open(process.env.REACT_APP_FRONTENDURL?.toString(), "_self"); }, 2000);
                        });
                } else {
                    toast.error("Invalid Parameters!", { autoClose: 1500 });
                }
            }
        } catch (error: any) {
            console.log("Root UseEffect error = : ", error.toString());
        }
    }, [])

    return (
        <div className="main-root">
            <ToastContainer />
            {modalOpen && <JoinNowModal setOpenModal={setModalOpen} waitlistEvent={onClickWaitList} />}
            {waitlistShow && <WaitListModal setOpenModal={setWaitListShow} />}
            {checkoutModalOpen && <CheckoutModal setCheckoutModalOpen={setCheckoutModalOpen} />}
            {signInModalOpen && <AuthModal setSignInModalOpen={setSignInModalOpen} />}
            {resetPasswordModalOpen && <ResetPasswordModal setResetPasswordModalOpen={setResetPasswordModalOpen} email={userEmail}/>}
            <NavBar setCheckoutModalOpen={setCheckoutModalOpen} setSignInModalOpen={setSignInModalOpen} />
            <Home setOpenModal={setModalOpen} setCheckoutModalOpen={setCheckoutModalOpen} />
            <VenusList />
        </div>
    )
}

export default Root
