import { FC, useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector, useDispatch } from "react-redux";
import { InitialState, AuthDispatcher } from "../../reducers/modules/user-reducer";
import './style.scss'

interface IJoinNow {
    setCheckoutModalOpen: any;
    setSignInModalOpen: any;
}

interface StateProps {
    isAuthenticated: boolean;
}

const NavBar: FC<IJoinNow> = ({ setCheckoutModalOpen, setSignInModalOpen }) => {

    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const { isAuthenticated } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            isAuthenticated: state.isAuthenticated
        }
    });

    const [active, setActive] = useState("active");
    const onClickNav = () => {
        if (active === "active") {
            setActive("inactive");
        }
        else {
            setActive("active");
        }
    }

    return (
        <header className={"main-nav"}>
            <div className='container header-div'>
                <nav className="links d-md-flex">
                    <ul className={`ps-0 ${active}`}>
                        <li className='d-none d-md-flex'><Link to="/#home-page" className="link">SOCIAL HOUSE</Link></li>
                        <li><Link to="/#home-page" className="link">About</Link></li>
                        <li><Link to="/access-keys/#access-keys" className="link">Access Keys</Link></li>
                        <li><Link to="/our-team/#our-team" className="link">Our Team</Link></li>
                        {/*<li className='d-flex d-md-none'><Link onClick={onClickBuyNow} className="link" to='#'>BUY NOW</Link></li>*/}
                        <li className='d-flex d-md-none'><a href="https://apps.apple.com/us/app/apollo-id/id1552644962" className="link">Member Portal</a></li>
                        <li className='d-flex d-md-none'><Link onClick={() => { setCheckoutModalOpen(true) }} className="link" to='#'>JOIN NOW</Link></li>
                        {
                            isAuthenticated && <li className='d-flex d-md-none'><Link onClick={() => { authDispatcher.logOut() }} className="link" to='#'>Sign Out</Link></li>
                        }
                        {
                            !isAuthenticated && <li className='d-flex d-md-none'><Link onClick={() => { setSignInModalOpen(true) }} className="link" to='#'>Sign In</Link></li>
                        }
                    </ul>
                </nav>
                <div className='d-none d-md-flex'>
                    <button className='btn-black-back border-round'>
                        <a href="https://apps.apple.com/us/app/apollo-id/id1552644962" className="link none-styled-link">Member Portal</a>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => { setCheckoutModalOpen(true) }} className='btn-black-back border-round'>
                        JOIN NOW
                    </button>
                    {
                        !isAuthenticated && <>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => { setSignInModalOpen(true) }} className='btn-black-back border-round'>
                                Sign In
                            </button>
                        </>
                    }
                    {
                        isAuthenticated && <>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => { authDispatcher.logOut() }} className='btn-black-back border-round'>
                                Sign Out
                            </button>
                        </>
                    }
                </div>

                <div className='row m-0 d-flex d-md-none w-100 justify-content-between'>
                    <div className='d-flex w-auto'>
                        <Link to="/#home-page" className="m-logo w-auto">SOCIAL HOUSE</Link>
                    </div>
                    <button className="toggle-nav w-auto" onClick={onClickNav}>&#9776;</button>
                </div>
            </div>
        </header>
    )
}

export default NavBar
