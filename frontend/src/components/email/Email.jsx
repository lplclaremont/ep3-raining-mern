import { useState } from 'react'
import './Email.css'; 

function Email({ responseData }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
  }

  const handleGenerateClick = () => {
    let url = `http://localhost:3000/email/`

    console.log(responseData)

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

  }


  return (
    <div>
      {responseData.length > 0 && (
        <>
          <p>Want a copy of your itinerary? Add your email address here:</p>
          <input type='email' onChange={handleEmailChange}></input>
          <button className={`button-email ${clicked ? 'clicked' : ''}`} onClick={handleGenerateClick}> {clicked ? 'Email Sent!':'Send Email'}</button>
        </>
      )}
    </div>
  );

}


export default Email;