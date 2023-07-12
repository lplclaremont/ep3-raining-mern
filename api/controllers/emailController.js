//file: api/controllers/emailController.js

const formatDate = require('../utils/formatDate');
const nodemailer = require('nodemailer');

const emailController = {
  sendEmail: (req, res) => {
    try {
      const { emailAddress, itinerary } = req.body;

      let emailBody = `Your personal itinerary from Whatever The Weather!\n\n`;
      itinerary.forEach((day) => {
        emailBody += `Date: ${formatDate(day.dt)}, Temp: ${day.temp.day.toFixed()}°C, Weather: ${day.weather[0].description}, Recommended activity: ${day.activity}\n\n`;
      });

      console.log(emailAddress);
      console.log(emailBody);

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

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ message: 'Email sent' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    }
  }
};

module.exports = emailController;
//added a try-catch block to handle any errors during email sending that may occur
