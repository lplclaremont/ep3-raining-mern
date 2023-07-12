import { useState , useEffect } from 'react'
import './Email.css'; 
import validateEmail from './validateEmail';

function Email({ responseData }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [clicked, setClicked] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);

  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
  }

  const handleGenerateClick = () => {
    let url = `http://localhost:3000/email/`

    console.log(responseData)

    if (validateEmail(emailAddress)) {
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          emailAddress: emailAddress,
          itinerary: responseData
        })
      }).catch(error => console.error(error));
  
      setClicked(true)
      setIncorrectEmail(false);
    } else {
      setIncorrectEmail(true);
    }
  }

  useEffect(() => {
    setClicked(false);
    setEmailAddress('');
    setIncorrectEmail(false);
  }, [responseData]);


  return (
    <div className="email-container">
      {responseData.length > 0 && (
        <>
          <p>Send a copy of your itinerary:</p>
          <input data-cy="email-input" className="email-input" value={emailAddress} type='email' placeholder="Enter your email address here" onChange={handleEmailChange} required></input>
          <button data-cy="email-button" className={`button-email ${clicked ? 'clicked' : ''}`} onClick={handleGenerateClick}> {clicked ? 'Email Sent!':'Send Email'}</button>
          <p className="error-message">{incorrectEmail ? 'Please enter a valid email address' : ''}</p>
        </>
      )}
    </div>
  );

}


export default Email;