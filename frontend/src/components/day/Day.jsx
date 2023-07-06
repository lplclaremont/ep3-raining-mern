function Day ({ day }) {
  const formattedDate = new Date(day.dt * 1000).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  console.log(formattedDate);
  
  return (
    <article className="day" key={day.dt}>
      <p>{formattedDate}</p>
    </article>
  )

}

export default Day