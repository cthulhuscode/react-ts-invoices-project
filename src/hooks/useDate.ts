export const useDate = () => {
  const daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthMap = [
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

  const getNumberOfDays = (year: number, month: number) => {
    // To get the number of days in a month.
    return 40 - new Date(year, month, 40).getDate();
  };

  const getDayDetails = (args: any) => {
    const date = args.index - args.firstDay;
    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    const timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const getMonthDetails = (year: number, month: number) => {
    // To get the start of the month.
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getNumberOfDays(year, month);
    const monthArray = [];
    const rows = 6;
    let index = 0;
    const cols = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const currentDay = getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  const oneDay = 60 * 60 * 24 * 1000;
  const todayTimestamp =
    Date.now() -
    (Date.now() % oneDay) +
    new Date().getTimezoneOffset() * 1000 * 60;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const isCurrentDay = (day: any) => {
    return day.timestamp === todayTimestamp;
  };

  const getMonthStr = (month: number) =>
    monthMap[Math.max(Math.min(11, month), 0)] !== null
      ? monthMap[Math.max(Math.min(11, month), 0)]
      : "Month";

  const getDateStringFromTimestamp = (timestamp: number) => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return `${dateObject.getFullYear()}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
  };

  const formatDate = (date: Date) => {
    const format = (date: Date, locale: any, options: any) =>
      new Intl.DateTimeFormat(locale, options).format(date);
    return format(date, "en-US", { dateStyle: "long" });
  };

  // const setYear = (offset: number) => {
  //   const year = details.year + offset;
  //   const month = details.month;
  //   setDetails({
  //     ...details,
  //     year,
  //     monthDetails: getMonthDetails(year, month),
  //   });
  // };

  return {
    formatDate,
    year,
    month,
    todayTimestamp,
    getMonthDetails,
    getMonthStr,
    isCurrentDay,
    getDateStringFromTimestamp,
  };
};
