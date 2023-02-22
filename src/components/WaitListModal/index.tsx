import React, {FC, useState} from 'react'
import './style.scss'
import Logo from "../../assets/images/logo.svg";
// import { Configuration, EmailsApi, EmailMessageData, BodyContentType } from '@elasticemail/elasticemail-client-ts-axios';

interface IProps{
    setOpenModal: any;
}

const WaitListModal: FC<IProps> = ({ setOpenModal }) => {
    const msg = {
        to: 'dan@thesocialhouse.io',
        subject: 'Email from Social House',
        // text: 'and easy to do anywhere, even with Node.js',
        html: '',
    };

    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    const isValidEmail = (email:string)  => {
        return /\S+@\S+\.\S+/.test(email);
      }

    const onClickSubmit = async () =>{

        if(name.trim() === '')
        {
            alert(`Please input the name`)
            return;
        }
        else if(emailAddress.trim() === '')
        {
            alert(`Please input the email address`)
            return;
        }
        else if(message.trim() === '')
        {
            alert(`Please input the message`)
            return;
        }
        else if(!isValidEmail(emailAddress))
        {
            alert(`Please check your email. This is not email format.`)
            return;
        }

        setOpenModal(false);
        msg.html = `<div style="display: block">
                    <div style="width: 100%">
                        <label style="margin-left: 15px">SOCIAL HOUSE</label>
                    </div>
                    <div style="margin-top: 30px">
                        <div style="width: 100%; display: block">
                            <label>E-mail : </label>
                            <p style="color: #000000">${emailAddress}</p>
                        </div>
                        <div style="width: 100%; display: block">
                            <label>Name : <p style="color: #000000">${name}</p> </label>
                            
                        </div>
                        <div style="width: 100%; display: block">
                            <label>Message : <p style="color: #000000">${message}</p> </label>
                            
                        </div>
                    </div>
                </div>`;
        window['sendEmail'](msg.subject, msg.html, msg.to);
        // const config = new Configuration({
        //     apiKey: process.env.REACT_APP_ElasticEmail_API_KEY
        // });

        // const emailsApi = new EmailsApi(config);
         
        // const emailMessageData = {
        //     Recipients: [
        //       { 
        //         Email: msg.to,
        //         Fields: {
        //           name: "Socialhouse"
        //         }
        //       }
        //     ],
        //     Content: {
        //         Body: [
        //             {
        //                 ContentType: BodyContentType.Html,
        //                 Charset: "utf-8",
        //                 Content: msg.html
        //             }
        //         ],
        //         From: emailAddress,
        //         Subject: msg.subject
        //     }
        //   }; // interface EmailMessageData from '@elasticemail/elasticemail-client-ts-axios'
         
        // const sendBulkEmails = (emailMessageData: EmailMessageData): void => {
        //     emailsApi.emailsPost(emailMessageData).then((response) => {
        //         console.log('API called successfully.');
        //         console.log(response.data);
        //         alert("Thank you for joining our waitlist. A team member will be in touch when memberships become available.")
        //     }).catch((error) => {
        //         console.error(error);
        //         alert("Your email address isn't allowed to send email here.")
        //     });
        // };
         
        // sendBulkEmails(emailMessageData);

    };
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="titleCloseBtn"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >X</button>
                <div className="title">
                    <img className='modal-logo' alt="access" src={Logo}></img>
                    <span className='font-times font-20px'>Enter your email to join our waitlist.</span>
                </div>
                <div className="body">
                    <div className="row p-3">
                        <div className="col-md-12 form-group">
                            <input name="name" placeholder="Full Name" className="form-control custom" value={name} onChange={(evt)=>{setName(evt.target.value)}}/>
                        </div>
                        <div className="col-md-12 form-group">
                            <input name="email" placeholder="Email Address" className="form-control custom" value={emailAddress} onChange={(evt)=>{setEmailAddress(evt.target.value)}} />
                        </div>
                        <div className="col-md-12 form-group">
                            <textarea name="message" placeholder="Leave a message here..." rows={4} className="form-control custom" onChange={(evt)=>{setMessage(evt.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn-black-round" onClick={onClickSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};
export default WaitListModal
