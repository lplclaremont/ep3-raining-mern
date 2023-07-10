
const emailController = {
  sendEmail: (req, res) => {
    let emailAddress = req.body.emailAddress;
    let itinerary = req.body.itinerary;

    const apiKey = res.locals.apiKey;
    console.log(emailAddress)
    console.log(itinerary)


    fetch(`https://uselessfacts.jsph.pl/random`)
      // .then(response => console.log(response))
      .then(response => res.status(200))
  }
};

module.exports = emailController;