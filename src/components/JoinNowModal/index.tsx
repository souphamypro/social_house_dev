import React, { FC } from 'react';
import { useSelector } from "react-redux";
import { InitialState } from "../../reducers/modules/user-reducer";
import { Col, Container } from "react-bootstrap";
import './style.scss';
import Logo from "../../assets/images/logo.svg";

interface IProps {
    setOpenModal: any;
    waitlistEvent: any;
}
interface StateProps {
    isAuthenticated: boolean;
}
const JoinNowModal: FC<IProps> = ({ setOpenModal, waitlistEvent }) => {

    const { isAuthenticated } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            isAuthenticated: state.isAuthenticated
        }
    });

    return (
        <div className="modalBackground">
            {/* {isAuthenticated ?  */}
            <div className="modalContainer">
                <button className="titleCloseBtn"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >X</button>
                <div className="title">
                    <img className='modal-logo' alt="access" src={Logo}></img>
                    <div className='font-times font-20px title-desc'>Purchase is currently unavailable</div>
                </div>
                <div className="body d-block m-t-10">
                    <div className="row">
                        <p className='font-20px text-start'>Access keys will be available for purchase in waves. Each wave will be active for 72 hours, during which time you can purchase an access key for the following price:</p>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <p className='font-dm font-20px text-start'>
                                <span className='font-bold'>Wave 1 - </span>
                                <span>$1000</span>
                            </p>
                        </div>
                        <div className={'col-md-12'}>
                            <p className={'font-dm font-20px text-start'}>
                                <span className='font-bold'>Wave 2 - </span>
                                <span>$2500</span>
                            </p>
                        </div>
                        <div className={'col-md-12'}>
                            <p className={'font-dm font-20px text-start'}>
                                <span className='font-bold'>Wave 3 + - </span>
                                <span>$5000</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className='row w-100 m-0 justify-content-between'>
                        <div className='w-auto d-flex px-0'>
                            <p className='m-auto'>Join our waitlist to be notified when each wave opens</p>
                        </div>
                        <button className="btn-black-back w-auto" onClick={() => { waitlistEvent() }}>WAITLIST</button>
                    </div>
                </div>
            </div>
            {/* <Container id="loginform">
                <Col lg="8" md="6" sm="9" xs="12" className='m-auto'>
                    <div className="d-flex p-0 m-0 mt-1">
                        <h2 id="headerTitle" className="text-red mb-5">Please SignIn!</h2>
                    </div>
                </Col>
            </Container> */}
        </div>
    );
};
export default JoinNowModal
