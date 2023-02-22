import { FC } from 'react'
import { ReactComponent as Logo } from '../../assets/images/logo_home.svg';
import { HashLink as Link } from 'react-router-hash-link';
import HorizonImg from '../../assets/images/s(6).jpg';
import './style.scss'
import keyImg from "../../assets/images/key.png";
import groupImg from "../../assets/images/group.png";
import sofaImg from "../../assets/images/sofa.png";
import TeamCard from "../OurTeam/TeamCard";

interface IJoinNow {
    setOpenModal: any;
    setCheckoutModalOpen: any;
}

let items = [
    {
        class_name: "col-md-4",
        img: keyImg,
        position: "",
        name: "Giving you access",
        description: "We offer access to clubs, events, and restaurants that are currently out of reach. Members are granted the opportunity to learn and socialize at hotspots including NYFW, Art Basel, F1 races, the Superbowl, and the US Open. ",
        link: []
    },
    {
        class_name: "col-md-4",
        img: groupImg,
        position: "",
        name: "Member-only events",
        description: "Social House events offer a unique experience by granting entry to quarterly parties exclusively for members. In-house events offer patrons the opportunity to network and socialize. Our mission is to provide unprecedented access to coveted global happenings from sports and entertainment to art. ",
        link: []
    },
    {
        class_name: "col-md-4",
        img: sofaImg,
        position: "",
        name: "Physical Lounge",
        description: "Our physical lounge is on the horizon. We are slated to break ground as early as 2023. This space will encourage co-working and will allow members to enjoy a craft cocktail at the bar or a tasty dish at the restaurant.",
        link: []
    },
];

const Home: FC<IJoinNow> = ({ setOpenModal, setCheckoutModalOpen }) => {

    const onClickBuyNow = () => {
        setCheckoutModalOpen(true)
    }

    return (
        <section id='home-page' className='container home-page'>
            <div className={'row'}>
                <div className='col-md-6 pb-150px m-pb-50px'>
                    <div className={'d-flex'}>
                        <div className={'d-block m-w-100'}>
                            <div className={'d-flex'}>
                                <Logo className={"m-auto logo"}></Logo>
                            </div>
                            <h1 className={'logo-text'}>The Social House</h1>
                        </div>
                    </div>

                    <h4 className="font-dm font-30px">We work hard so that you play harder.</h4>
                    <p className='font-dm font-20px'>Experience the best the world has to offer, from access to coveted happenings and Social House exclusive events.</p>
                </div>
                <div className='col-md-6 home-main-back'>
                    {/*<img className={'home-main-img'} src={HomeBackImg}></img>*/}
                </div>
            </div>

            <div className={'row home-description'}>
                <p className={'m-auto text-center font-dm font-30px'}>A one stop members' club to meet new people and go new places. </p>
                <p className={'m-auto text-center font-dm font-30px'}>This is Social House. </p>
            </div>

            <div className={'row'}>
                <p className={'font-30px m-custom-align'}>What Makes The Social House Different?</p>
                <p className={'font-dm font-20px m-custom-align'}>Unlike traditional clubs, our memberships are <span className='font-bold'>transferrable</span>. Stored on the blockchain, our member access keys become an asset that you can sell or transfer at any time.</p>
            </div>

            <div className={'horizon-part'}>
                {/* <p className='font-30px m-custom-align'>ON THE HORIZON</p>
                <p className='font-dm font-20px m-custom-align'>In addition to providing our members free access to some of the best venues and events on the East Coast, we will soon be opening a Social House physical location. </p> */}
                <p className='font-30px m-custom-align'>How Membership Works</p>
                <p className='font-dm font-20px m-custom-align m-padding-0-100'>A Social House membership is a gateway to a vast network of hospitality experts who execute at the highest level. By making anything–and everything–possible, we offer unparalleled access and a tailored luxury lifestyle, now and into the future.</p>
                <div className={'row membership-work'}>
                    {items.map((item, index) =>
                        <TeamCard key={index} {...item} />
                    )}
                </div>

                <div className={'row'}>
                    <img className={'w-100'} alt="horz" src={HorizonImg}></img>
                </div>
            </div>

            <div className='join-house mt-5'>
                <div className={'row mx-0 d-block d-md-flex'}>
                    <p className='me-5 font-45px line-height-45px w-auto m-w-100'>Join the Social House</p>
                    <div className='w-auto'>
                        <button className='btn-black-back me-3' onClick={onClickBuyNow}>BUY NOW</button>
                        {/* <button className='btn-black-back' onClick={setOpenModal}>JOIN WAITLIST</button> */}
                    </div>
                </div>
                <div className={'row mx-0 mt-3'}>
                    <div className={'col-md-10 col-12'}>
                        <p className='font-dm font-20px'>Our various access keys offer a wide array of benefits. Learn more about enrollment and explore our full list of perks here:</p>
                    </div>
                </div>
                <div className={'row mx-0 mt-3'}>
                    <div className={'col-md-10 col-12'}>
                        {/* <button className='btn-black-back border-round py-3 m-py-2'>Explore Access Keys</button> */}
                        <Link className='btn-black-back border-round py-3 m-py-2 link' to="/access-keys/#access-keys">Explore Access Keys</Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Home
