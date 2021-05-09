import { Component, createRef, useState } from "react";
import Header from "./header";
import Days from "./days";
import moment from "moment";
// import Input from "../global/input";
import styles from "../../styles/Datepicker.module.css";

function Datepicker({
  id,
  label,
  // assets={assets}
  noToday,
  value,
  // components={components}
  placeholder,
  onChange,
  disabled,
  noTomorrow,
  required,
}) {
  const [date, setDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const inputRef = createRef();

  const {
    show,
    datepicker__container,
    datepicker: datepickerClass,
    datepicker__label,
    datepicker__input,
    datepicker__icon,
    datepicker__content,
    invalid,
    disabled_icon,
  } = styles;

  const requiredField = (input) => {
    if (required) {
      if (inputValue || value) {
        input.classList.remove(invalid);
      } else {
        input.classList.add(invalid);
      }
    }
  };
  const removeBorder = (input) => {
    if (required) {
      if (input.classList.contains(invalid)) {
        input.classList.remove(invalid);
      }
    }
  };
  const datepickerHandler = (id) => {
    const datepicker = document.getElementById(id).classList;
    if (datepicker.contains(show)) {
      datepicker.remove(show);
    } else {
      clearDatepickerContent();
      datepicker.add(show);
    }

    window.onclick = (event) => {
      const target = event.target;
      if (
        !target.closest(`.${datepickerClass}`) &&
        !target.closest(`.${datepicker__content}`)
      )
        clearDatepickerContent();
    };
  };
  const clearDatepickerContent = () => {
    const datepickers = document.getElementsByClassName(datepicker__content);
    for (let i = 0; i < datepickers.length; i++) {
      const openDatepicker = datepickers[i].classList;
      if (openDatepicker.contains(show)) openDatepicker.remove(show);
    }
  };
  const onPrevHandler = (date) => {
    const newMonth = date.getMonth() - 1;
    const newDate = new Date(date.setMonth(newMonth));
    setDate(newDate);
  };

  const onNextHandler = (date) => {
    const newMonth = date.getMonth() + 1;
    const newDate = new Date(date.setMonth(newMonth));
    setDate(newDate);
  };
  const onPrevYearHandler = (date) => {
    const newMonth = date.getMonth() - 12;
    const newDate = new Date(date.setMonth(newMonth));
    setDate(newDate);
  };

  const onNextYearHandler = (date) => {
    const newMonth = date.getMonth() + 12;
    const newDate = new Date(date.setMonth(newMonth));
    setDate(newDate);
  };

  const onClickHandler = (date, id) => {
    clearDatepickerContent();
    document.getElementById(id).value = date;
    onChange(date, id);
    setInputValue(date);
    removeBorder(inputRef.current);
  };

  // const { date, inputValue } = state;
  // var icons = assets && assets.icons ? assets.icons : {};
  // var value = moment(value).format('D MMMM YYYY')
  // let inputValueFormat = new Date(value);
  // inputValueFormat = moment(inputValueFormat).format('D MMMM YYYY');
  // value && document.getElementById(id)
  //   ? (document.getElementById(id).value = value)
  //   : '';

  return (
    <div>
      {label && <label className={datepicker__label}>{label}</label>}
      <div className={datepicker__container}>
        {disabled ? (
          <div className={datepickerClass}>
            <Input
              value={value ? moment(value).format("D MMMM YYYY") : ""}
              disabled
            />
            <a className={`${datepicker__icon} ${disabled_icon}`}>
              {/* <img src={icons.calendarCompleteProfile} /> */}
              {"img"}
            </a>
          </div>
        ) : (
          <div className={datepickerClass}>
            <input
              ref={inputRef}
              className={datepicker__input}
              value={value ? moment(value).format("D MMMM YYYY") : ""}
              disabled={disabled}
              placeholder={placeholder}
              onFocus={() => {
                datepickerHandler(id);
              }}
              readOnly
              onBlur={(event) => {
                requiredField(event.target);
              }}
              onSubmit={(event) => {
                requiredField(inputRef.current);
              }}
            />

            <a className={datepicker__icon}>
              {/* <img
                src={icons.calendarCompleteProfile}
                onclick={() => {
                  disabled ? "" : datepickerHandler(id);
                }}
              /> */}
              <div
                onClick={() => {
                  disabled ? "" : datepickerHandler(id);
                }}
              >
                img
              </div>
            </a>
          </div>
        )}
        <div id={id} className={datepicker__content}>
          <Header
            // icons={icons}
            date={date}
            onPrevHandler={() => onPrevHandler(date)}
            onNextHandler={() => onNextHandler(date)}
            onPrevYearHandler={() => {
              onPrevYearHandler(date);
            }}
            onNextYearHandler={() => onNextYearHandler(date)}
          />

          <Days
            noToday={noToday}
            noTomorrow={noTomorrow}
            date={date}
            onClickHandler={(date) => onClickHandler(date, id)}
            selectedDate={inputValue}
            // components={components}
          />
        </div>
      </div>
    </div>
  );
}
export default Datepicker;

// class Datepicker extends Component {
//   constructor(props) {
//     super(props);

//     state = {
//       date: new Date(),
//       inputValue: "",
//     };

//     inputRef = createRef();
//     removeBorder = removeBorder.bind(this);
//     requiredField = requiredField.bind(this);
//     onClickHandler = onClickHandler.bind(this);
//   }
//   componentWillUnmount() {
//     removeBorder(inputRef.current);
//   }
// }
