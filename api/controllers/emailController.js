const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fromwhatevertheweather@gmail.com',
    pass: 'shqbbwkeyvfagvjd'
  }
});



const emailController = {
  sendEmail: (req, res) => {
    let emailAddress = req.body.emailAddress;
    let itinerary = req.body.itinerary;

    const apiKey = res.locals.apiKey;
    console.log(emailAddress)
    console.log(itinerary)

    const mailOptions = {
      from: 'fromwhatevertheweather@gmail.com',
      to: emailAddress,
      subject: 'Itinerary',
      text: 'Email content'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful
      }
    });

    
  }
};

module.exports = emailController;