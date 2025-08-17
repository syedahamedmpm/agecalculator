import { useCallback, useState } from "react";
import "./App.css";
import calendarIcon from "./assets/calendar.svg";

function App() {
  const [showText, setShowText] = useState(false);

  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [input, setInput] = useState({
    startDate: today,
    endDate: today,
  });

  const [difference, setDifference] = useState({
    yearDifference: "",
    monthDifference: "",
    dateDifferece: "",
  });

  const [total, setTotal] = useState({
    totalHours: "",
    totalDays: "",
    totalWeeks: "",
    totalMonths: "",
    totalMinutes: "",
    totalSeconds: "",
    weekDayDifference: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("INPUT==>", input);

    let start = new Date(input?.startDate);
    let end = new Date(input?.endDate);

    /**Age Calculation - PART 1 -START*/

    let yearDifferenced = end?.getFullYear() - start?.getFullYear();
    let monthDifferenced = end?.getMonth() - start?.getMonth();
    let daysDifferenced = end?.getDate() - start?.getDate();
    // Borrow days from previous month if negative
    if (daysDifferenced < 0) {
      monthDifferenced -= 1;
      // get last day of previous month
      let prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    // Borrow months from previous year if negative
    if (monthDifferenced < 0) {
      yearDifferenced -= 1;
      monthDifferenced += 12;
    }

    /**Age Calculation - PART 1 -END*/
    /**Age Calculation - PART 2 -START*/
    const timeDifference = end - start;

    console.log("timeDifference", timeDifference);

    const totalHours = timeDifference / (1000 * 60 * 60);
    const totalMinutes = timeDifference / (1000 * 60);
    const totalSeconds = timeDifference / 1000;

    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log("totalDays", totalDays);

    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    const totalWeeks = Math.floor(totalDays / 7);

    const weekDayDifference = totalDays % 7;
    console.log("totalWeeks", totalWeeks);
    console.log("weekDayDifference", weekDayDifference);
    /**Age Calculation - PART 2 -END*/
    setShowText(true);
    setDifference({
      yearDifference: yearDifferenced,
      monthDifference: monthDifferenced,
      dateDifferece: daysDifferenced,
    });
    setTotal({
      totalDays: totalDays,
      totalWeeks: totalWeeks,
      weekDayDifference: weekDayDifference,
      totalMonths: totalMonths,
      totalHours: totalHours,
      totalMinutes: totalMinutes,
      totalSeconds: totalSeconds,
    });
  };

  console.log("input", input);
  return (
    <div className="container">
      <h1>Age Calculator</h1>

      <div className="form-group">
        <label>Select DOB</label>
        <input
          type="date"
          onChange={handleOnChange}
          name="startDate"
          value={input.startDate}
        />
      </div>
      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          onChange={handleOnChange}
          name="endDate"
          value={input.endDate}
        />
      </div>

      <button className="btn" onClick={handleSubmit}>
        Calculate
      </button>

      <p className="result">
        {showText &&
          `Your age is ${difference?.yearDifference} years and ${difference?.monthDifference} months and ${difference?.dateDifferece} days`}
      </p>
      <p className="result">{showText && `OR ${total?.totalDays} Days`}</p>
      <p className="result">
        {showText &&
          `OR ${total?.totalWeeks} Weeks ${total?.weekDayDifference} Days`}
      </p>
      <p className="result">
        {showText &&
          `OR ${total?.totalMonths} Months ${difference?.dateDifferece} Days`}
      </p>
      <p className="result">{showText && `OR ${total?.totalHours} Hours`}</p>
      <p className="result">
        {showText && `OR ${total?.totalMinutes} Minutes`}
      </p>
      <p className="result">
        {showText && `OR ${total?.totalSeconds} Seconds`}
      </p>
    </div>
  );
}

export default App;
