const formatDate = require('../utils/formatDate')
const nodemailer = require('nodemailer');

const emailController = {
  sendEmail: (req, res) => {
    let emailAddress = req.body.emailAddress;
    let itinerary = req.body.itinerary;

    let emailBody = `Your personal itinerary from Whatever The Weather!\n\n`
    itinerary.forEach((day) => {
      emailBody += `Date: ${formatDate(day.dt)}, Temp: ${day.temp.day.toFixed()}°C, Weather: ${day.weather[0].description}, Recommended activity: ${day.activity}\n\n `
    })

    console.log(emailAddress)
    console.log(emailBody)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fromwhatevertheweather@gmail.com',
        pass: 'shqbbwkeyvfagvjd'
      }
    });

    const mailOptions = {
      from: 'fromwhatevertheweather@gmail.com',
      to: emailAddress,
      subject: 'Your itinerary!',
      text: emailBody
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({message: 'Email sent'})
      }
    });

  }
};

module.exports = emailController;