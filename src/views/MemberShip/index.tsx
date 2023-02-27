import { FC, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { PaperSDKProvider, LoginWithPaper } from '@paperxyz/react-client-sdk'
import copy from "copy-to-clipboard";
import axios from "axios";
import './style.scss';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import JoinNowModal from "../../components/JoinNowModal";
// import WaitListModal from "../../components/WaitListModal";
import { useSelector, useDispatch } from "react-redux";
import { InitialState, AuthDispatcher } from "../../reducers/modules/user-reducer";
import { goerli_info } from '../../utils/networks';
import { providerOptions } from "../../utils/providerOptions";
import CheckoutModal from '../../components/CheckoutModal';
import NavBar from '../../components/NavBar';

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: providerOptions // required
});

interface StateProps {
    isAuthenticated: boolean;
    session: string | null;
    walletAddress: string | null;
    walletAddressPaper: string | null;
    emailPaper: string | null;
}

const MemberShip: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const { isAuthenticated, session, walletAddress, walletAddressPaper } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            isAuthenticated: state.isAuthenticated,
            session: state.session,
            walletAddress: state.walletAddress,
            walletAddressPaper: state.walletAddressPaper,
            emailPaper: state.emailPaper,
        }
    });

    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const [signInModalOpen, setSignInModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    // const [account, setAccount] = useState("");

    const onLoginSuccess = async (code: string) => {
        console.log("MemberShip onLoginSuccess code = : ", code);
        // setIsLoading(true);
        if ( code !== undefined ) {
            let response = await axios.post(process.env.REACT_APP_BACKURL + "api/exchange-user-token", { code: code }, {
                headers: {
                    Session: session
                }
            });
            console.log("MemberShip papaer onLoginSuccess response = : ", response);
            setIsLoading(false);
            if (response.status === 200) {
                authDispatcher.loginSuccessPaper(response.data.email, response.data.walletAddress);
                toast.success("Saved to login Paper!", { autoClose: 1500 });
            } else {
                toast.error(response.data, { autoClose: 1500 });
                authDispatcher.logOut();
            }
        } else {
            toast.error("Invalid Login Code", { autoClose: 1500 });
        }
    }

    const onLogOut = async () => {
        authDispatcher.logOutPaper();
        toast.warning("LogOut Paper!", { autoClose: 1500 });
    }

    const connectWallet = async () => {
        try {
            // console.log("Settings connect accounts : ");
            if (typeof window.ethereum === "undefined") {
                toast.error("Error - MetaMask is not installed!", { position: "bottom-right", autoClose: 1500 });
            } else {
                // setIsLoading(true);
                var provider = await web3Modal.connect();
                var library = new ethers.providers.Web3Provider(provider);
                var accounts = await library.listAccounts();
                const network = await library.getNetwork();
                // console.log("Settings connect accounts : ", accounts, network, props.chainId);
                if (network.chainId.toString() !== goerli_info.chainId) {
                    if (window.ethereum) {
                        let chainId = ethers.utils.hexStripZeros(ethers.utils.hexlify(parseInt(goerli_info.chainId)));
                        try {
                            await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chainId }] });
                        } catch (error) {
                            try {
                                await window.ethereum.request({
                                    method: "wallet_addEthereumChain",
                                    params: [{
                                        chainId: chainId,
                                        rpcUrls: [goerli_info.rpcURL],
                                        chainName: goerli_info.chainName,
                                        nativeCurrency: {
                                            name: goerli_info.name,
                                            symbol: goerli_info.symbolName,
                                            decimals: goerli_info.decimals
                                        },
                                        blockExplorerUrls: [goerli_info.explorerURL]
                                    }]
                                });
                            } catch (error) {
                                console.log("settings.js connect add_chain error = : ", error);
                                setIsLoading(false);
                                return;
                            }
                        }
                        provider = await web3Modal.connect();
                        library = new ethers.providers.Web3Provider(provider);
                        accounts = await library.listAccounts();
                        setIsLoading(false);
                        if (accounts) {
                            // setAccount(accounts[0]);
                            authDispatcher.connectWallet(accounts[0]);
                            toast.success("Success to Connect Wallet!", { autoClose: 1500 });
                        } else {
                            toast.error("Failed to Connect Wallet!", { autoClose: 1500 });
                        }
                    }
                } else {
                    setIsLoading(false);
                    if (accounts) {
                        // setAccount(accounts[0]);
                        authDispatcher.connectWallet(accounts[0]);
                        toast.success("Success to Connect Wallet!", { autoClose: 1500 });
                    } else {
                        toast.error("Failed to Connect Wallet!", { autoClose: 1500 });
                    }
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.log("MemberShip index connectWallet error : ", error);
            toast.error("Failed to load !", { autoClose: 1500 });
        }
    }

    const disconnectWallet = async () => {
        // setAccount("");
        authDispatcher.disconnectWallet();
        toast.warning("Disconnect Wallet!", { autoClose: 1500 });
    }

    const save_clipboard = (value: string) => {
        // console.log(" Settings save_clipboard value : ", value);
        toast.success("Saved to Clipboard!", { autoClose: 1500 });
        copy(value);
    }

    useEffect(() => {
        const checkSession = async () => {
            // get the data from the api
            const data = await axios.post(process.env.REACT_APP_BACKURL + "api/check-auth", {}, {
                headers: {
                    Session: session
                }
            });
            console.log("MemberShip useEffect checkSession response = : ", data);
            if (data.status !== 200) {
                toast.error(data.data, { autoClose: 1500 });
                authDispatcher.logOut();
            }
            return data;
        }
        console.log("MemberShip UseEffect isAuthenticated = : ", isAuthenticated);
        if (!isAuthenticated) {
            navigate("/");
        } else {
            checkSession().catch((error) => {
                console.log(error); authDispatcher.logOut();
            });
        }
    }, [isAuthenticated, session, walletAddress, walletAddressPaper]);

    return (
        <>
            {/* {modalOpen && <JoinNowModal setOpenModal={setModalOpen} waitlistEvent = {onClickWaitList}/>}
            {waitlistShow && <WaitListModal setOpenModal={setWaitListShow}/>} */}
            <ToastContainer position="top-right" />
            {
                isLoading && <div className="w-100 h-100 loading">
                    <Row className="loading-progress-area">
                        <CircularProgress size={100} className="text-color" />
                    </Row>
                </div>
            }
            {checkoutModalOpen && <CheckoutModal setCheckoutModalOpen={setCheckoutModalOpen} />}
            <NavBar setCheckoutModalOpen={setCheckoutModalOpen} setSignInModalOpen={setSignInModalOpen} />
            <section className="container access-keys h-100" id="access-keys">
                <Row>
                    <h1 className='font-times font-45px'>MemberShip</h1>
                    <div className={'col-md-10 col-12'}>
                        <p className='font-dm font-20px'></p>
                    </div>
                </Row>
                <div className="col-12 platinum-key mb-3 mt-5 h-100 access-key-item">
                    <div className={'row py-5 access-key-item h-100'}>
                        <div className="mx-0 my-5 m-auto btn-membership">
                            <Row className='m-0 w-100'>
                                <Col lg="4" md="5" sm="12" xs="12" className='mb-3'>
                                    {
                                        (walletAddress === "" || walletAddress === null) ? <Button
                                            className="btn btn-lg button-border-color w-100 m-auto"
                                            variant="success"
                                            onClick={() => { connectWallet() }}>Connect Wallet
                                        </Button> : <Button
                                            className="btn btn-lg button-border-color w-100 m-auto"
                                            variant="danger"
                                            onClick={() => { disconnectWallet() }}>Disconnect Wallet
                                        </Button>
                                    }
                                </Col>
                                <Col lg="6" md="7" sm="12" xs="12" className='mb-3'>
                                    {
                                        (walletAddress !== "" && walletAddress !== null) && <div onClick={() => { save_clipboard(walletAddress) }}>
                                            <input type="text" className="input-style w-100 m-auto" value={walletAddress} disabled={true} />
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row className='m-0 mt-4'>
                                <Col lg="4" md="5" sm="12" xs="12" className='mb-3'>
                                    {
                                        (walletAddressPaper === "" || walletAddressPaper === null) ?
                                            <PaperSDKProvider clientId={process.env.REACT_APP_PAPTER_CLIENT_ID} chainName="Goerli">
                                                <LoginWithPaper className="btn btn-success btn-lg text-white w-100" onSuccess={(code) => onLoginSuccess(code)} />
                                            </PaperSDKProvider> : <Button
                                                className="btn btn-lg button-border-color w-100 m-auto"
                                                variant="danger"
                                                onClick={() => { onLogOut() }}>LogOut Paper
                                            </Button>
                                    }
                                </Col>
                                <Col lg="6" md="7" sm="12" xs="12" className='mb-3'>
                                    {
                                        (walletAddressPaper !== "" && walletAddressPaper !== null) && <div onClick={() => { save_clipboard(walletAddressPaper) }}>
                                            <input type="text" className="input-style w-100 m-auto" value={walletAddressPaper} disabled={true} />
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </div>
                        <Col lg="4" md="3" sm="2" xs="2"></Col>
                    </div>
                </div>
            </section>
        </>

    )
}

export default MemberShip
