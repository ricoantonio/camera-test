import { Component } from "react";
import styles from "../../styles/Datepicker.module.css";
// import styles from './styles.scss';

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Header({
  icons,
  date,
  onPrevHandler,
  onNextHandler,
  onPrevYearHandler,
  onNextYearHandler,
}) {
  const { datepicker__header, prev, right, center } = styles;
  const prevHandler = () => {
    const date = date;
    onPrevHandler(date);
  };
  const nextHandler = () => {
    const date = date;
    onNextHandler(date);
  };
  const prevYearHandler = () => {
    const date = date;
    onPrevYearHandler(date);
  };
  const nextYearHandler = () => {
    const date = date;
    onNextYearHandler(date);
  };
  return (
    <div className={datepicker__header}>
      {/* Prev */}
      <a className={prev} onClick={() => prevYearHandler()}>
        {/* <img src={icons.arrowLeftPagination} />
          <img src={icons.arrowLeftPagination} /> */}
        <div>{"<<"}</div>
      </a>
      <a className={prev} onClick={() => prevHandler()}>
        {/* <img src={icons.arrowLeftPagination} /> */}
        <div>{"<"}</div>
      </a>

      {/* Center */}
      <div className={`${center} text-bold`}>
        <span>
          {month[date.getMonth()]} {date.getFullYear()}
        </span>
      </div>

      {/* Next */}
      <a className={right} onClick={() => nextHandler()}>
        {/* <img src={icons.arrowRightPagination} /> */}
        <div>{">"}</div>
      </a>
      <a className={right} onClick={() => nextYearHandler()}>
        {/* <img src={icons.arrowRightPagination} /> */}
        {/* <img src={icons.arrowRightPagination} /> */}
        <div>{">>"}</div>
      </a>
    </div>
  );
}
export default Header;
