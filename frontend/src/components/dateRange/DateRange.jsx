import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function DateRange({ setFromDay, setToDay }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 2));

  const onDateChange = (dates) => {
    const [start, end] = dates;
    // set DateRange state
    setStartDate(start);
    setEndDate(end);
    // set the parent's state to equal the diff between today and DateRange state
    // constrained to valid outcome by DatePicker minDate and maxDate
    setFromDay(differenceInCalendarDays(start, new Date()));
    setToDay(differenceInCalendarDays(end, new Date()));
  };

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={onDateChange}
      minDate={new Date()}
      maxDate={addDays(new Date(), 7)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      // inline
    />
  );
}

export default DateRange;