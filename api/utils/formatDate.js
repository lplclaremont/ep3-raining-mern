const formattedDate = (unixDate) => {
  return new Date(unixDate * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

module.exports = formattedDate;