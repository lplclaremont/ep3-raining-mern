import { useState } from 'react'

function Email({ responseData }) {
  const [emailAddress, setEmailAddress] = useState('');

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
  }

  return (
    <div>
      {responseData.length > 0 && (
        <>
          <p>Want a copy of your itinerary? Add your email address here:</p>
          <input type='email' onChange={handleEmailChange}></input>
          <button onClick={handleGenerateClick}>Send Email</button>
        </>
      )}
    </div>
  );

}

export default Email;