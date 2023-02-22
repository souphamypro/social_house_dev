import { FC } from 'react'
import { useSelector } from "react-redux";
import { InitialState } from "../../reducers/modules/user-reducer";
import { Col, Container } from "react-bootstrap";
import { CHECKOUT_SHAREABLE_LINK } from '../../utils/paper.mjs';
// import "@paperxyz/react-client-sdk/dist/index.css";
import './style.scss'

interface IProps {
    setCheckoutModalOpen: any;
}

interface StateProps {
    isAuthenticated: boolean;
}
const CheckoutModal: FC<IProps> = ({ setCheckoutModalOpen }) => {

    const { isAuthenticated } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            isAuthenticated: state.isAuthenticated
        }
    });

    return (
        <>
            {/* {isAuthenticated ?  */}
            <div className="modalBackground">
                <div className="checkout-modalContainer">
                    <button className="titleCloseBtn"
                        onClick={() => {
                            setCheckoutModalOpen(false);
                        }}
                    >X</button>
                    <iframe src={CHECKOUT_SHAREABLE_LINK} width="100%" height="600px" allow="payment"></iframe>
                </div>
            </div>
            {/* <Container id="loginform">
                    <Col lg="8" md="6" sm="9" xs="12" className='m-auto'>
                        <div className="d-flex p-0 m-0 mt-1">
                            <h2 id="headerTitle" className="text-red mb-5">Please SignIn!</h2>
                        </div>
                    </Col>
                </Container> */}
        </>
    );
};
export default CheckoutModal
