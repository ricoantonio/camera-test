import { Component } from "react";

import styles from "../../styles/Datepicker.module.css";

function Days({ noToday, noTomorrow, date, onClickHandler, selectedDate }) {
  const {
    datepicker__days,
    weekdays,
    day_names,
    day_name,
    date_numbers,
    date_number,
    new_row,
    new_row_wrapper,
    date_number_item,
    activeNow,
    inactive,
    selected,
    holiday,
  } = styles;

  const getDaysInMonth = (month, year) => {
    const date = new Date(Date.UTC(year, month, 1));
    const days = [];

    const startDate = new Date(date);
    const startDateDay = startDate.getDay();

    switch (startDateDay) {
      case 1:
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 2:
        startDate.setDate(startDate.getDate() - 2);
        break;
      case 3:
        startDate.setDate(startDate.getDate() - 3);
        break;
      case 4:
        startDate.setDate(startDate.getDate() - 4);
        break;
      case 5:
        startDate.setDate(startDate.getDate() - 5);
        break;
      case 6:
        startDate.setDate(startDate.getDate() - 6);
        break;
      case 7:
        startDate.setDate(startDate.getDate() - 0);
        break;
    }

    const sd = new Date(startDate);

    for (let i = 0; i < 35; i++) {
      days.push(new Date(sd));
      sd.setDate(sd.getDate() + 1);
    }

    return days;
  };

  const dateNumberHandler = (date) => {
    onClickHandler(date);
  };
  const dateNumberItem = (
    item,
    date,
    itemDate,
    dateDate,
    selectedDateFormat,
    sunday
  ) => {
    return (
      <a
        className={`
          ${date_number} 
          ${itemDate === dateDate ? activeNow : ""} 
          ${item.getMonth() !== date.getMonth() ? inactive : ""}
          ${itemDate === selectedDateFormat ? selected : ""}
          ${noToday ? (item < new Date() ? inactive : "") : ""}
          ${noTomorrow ? (item > new Date() ? inactive : "") : ""}
          ${sunday ? holiday : ""}
        `}
        onClick={() => dateNumberHandler(item)}
      >
        <div className={date_number_item}>{item.getDate()}</div>
      </a>
    );
  };
  const days = getDaysInMonth(date.getMonth(), date.getFullYear());
  let selectedDateFormat = new Date(selectedDate);
  selectedDateFormat =
    selectedDateFormat.getDate() +
    "/" +
    selectedDateFormat.getMonth() +
    "/" +
    selectedDateFormat.getFullYear();

  // const day =
  //   components && components.datepicker && components.datepicker.days
  //     ? components.datepicker.days
  //     : {};

  return (
    <div className={datepicker__days}>
      <div className={weekdays}>
        <div className={day_names}>
          <div className={day_name}>Sun</div>
          <div className={day_name}>Mon</div>
          <div className={day_name}>Tue</div>
          <div className={day_name}>Wed</div>
          <div className={day_name}>Thu</div>
          <div className={day_name}>Fri</div>
          <div className={day_name}>Sat</div>
        </div>
        <div className={date_numbers}>
          {days.map((item, index) => {
            let rendered;
            const currentDate = new Date();
            const itemDate =
              item.getDate() + "/" + item.getMonth() + "/" + item.getFullYear();
            const dateDate =
              currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear();

            if (index % 7 === 0) {
              let sunday = true;
              rendered = (
                <div className={new_row_wrapper}>
                  <div className={new_row}></div>
                  {dateNumberItem(
                    item,
                    date,
                    itemDate,
                    dateDate,
                    selectedDateFormat,
                    sunday
                  )}
                </div>
              );
            } else {
              rendered = dateNumberItem(
                item,
                date,
                itemDate,
                dateDate,
                selectedDateFormat
              );
            }
            return rendered;
          })}
        </div>
      </div>
    </div>
  );
}

export default Days;
