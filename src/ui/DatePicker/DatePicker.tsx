import { useRef, useState } from "react";

import { images } from "../../constants";

import { useDate } from "../../hooks/useDate";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import type { CustomDate } from "../../interfaces";
import { useAppSelector } from "../../redux";
import "./DatePicker.scss";

interface DatePickerProps {
  onChangeDate: ({ timestamp, dateString, friendlyDate }: CustomDate) => void;
  label: string;
  classes: string;
}

export const DatePicker = ({
  onChangeDate,
  label,
  classes,
}: DatePickerProps) => {
  const formOperation = useAppSelector(
    (state) => state.invoices.form.operation
  );
  const invoiceDate = useAppSelector(
    (state) => state.invoices.currentInvoice.date
  );

  const {
    formatDate,
    year,
    month,
    todayTimestamp,
    getMonthDetails,
    getMonthStr,
    isCurrentDay,
    getDateStringFromTimestamp,
  } = useDate();
  const ref = useRef(null);

  const [details, setDetails] = useState({
    showDatePicker: false,
    year,
    month,
    selectedDay:
      invoiceDate !== undefined
        ? parseInt(invoiceDate.timestamp)
        : todayTimestamp,
    monthDetails: getMonthDetails(year, month),
  });

  useOnClickOutside(ref, () => {
    setDetails({
      ...details,
      showDatePicker: false,
    });
  });

  const setMonth = (offset: number) => {
    let year = details.year;
    let month = details.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    setDetails({
      ...details,
      year,
      month,
      monthDetails: getMonthDetails(year, month),
    });
  };

  const isSelectedDay = (day: any) => {
    return parseInt(day.timestamp) === details.selectedDay;
  };

  const showDatePicker = () => {
    setDetails({
      ...details,
      showDatePicker: !details.showDatePicker,
      selectedDay:
        invoiceDate !== undefined
          ? parseInt(invoiceDate.timestamp)
          : todayTimestamp,
    });
  };

  const onDateClick = (day: any) => {
    const { timestamp } = day;

    setDetails({
      ...details,
      selectedDay: timestamp,
      showDatePicker: false,
    });

    const dateString = getDateStringFromTimestamp(timestamp);
    const friendlyDate = formatDate(timestamp);
    onChangeDate({ timestamp: timestamp.toString(), dateString, friendlyDate });
  };

  return (
    <div className={`datepicker dp ${classes}`} ref={ref}>
      <label className="dp__label">{label}</label>

      <div ref={ref} className="dp__date" onClick={showDatePicker}>
        <span className="dp__date-text">
          {formOperation === "edit"
            ? invoiceDate?.friendlyDate
            : formatDate(new Date())}
        </span>
        <div className="dp__date-icon">
          <img src={images.calendar} alt="" />
        </div>
      </div>

      {details.showDatePicker && (
        <div className="dp__picker" ref={ref}>
          <div className="picker__head">
            <div
              className="picker__arrow"
              onClick={() => {
                setMonth(-1);
              }}
            >
              <img src={images.leftArrow} alt="left arrow" />
            </div>

            <div className="picker__date">
              <span className="picker__month picker__date-text">
                {getMonthStr(details.month)}
              </span>
              <span className="picker__year picker__date-text">
                {details.year}
              </span>
            </div>

            <div
              className="picker__arrow"
              onClick={() => {
                setMonth(1);
              }}
            >
              <img src={images.rightArrow} alt="right arrow" />
            </div>
          </div>

          <div className="picker__calendar">
            <div className="calendar__days">
              {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day, index) => (
                <div key={index} className="calendar__day">
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar__numbers">
              {details.monthDetails?.map((day, index) => (
                <div
                  className={
                    "calendar__cell " +
                    (day.month !== 0 ? " disabled" : "") +
                    (isCurrentDay(day) ? " highlight" : "") +
                    (isSelectedDay(day) ? " highlight-purple" : "")
                  }
                  key={index}
                  onClick={() => {
                    onDateClick(day);
                  }}
                >
                  <span className="calendar__number">{day.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
