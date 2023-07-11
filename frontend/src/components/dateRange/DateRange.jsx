import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

function DateRange({ setFromDay, setToDay }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onDayChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setFromDay(differenceInCalendarDays(start, new Date()));
    setToDay(differenceInCalendarDays(end, new Date()));
  };

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={onDayChange}
      minDate={new Date()}
      maxDate={addDays(new Date(), 7)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      // inline
    />
  );
};

export default DateRange;