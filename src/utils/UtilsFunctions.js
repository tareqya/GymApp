export const CompareDateObjects = (date1, date2) => {
  return (
    date1.getDay() == date2.getDay() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};

export const StringHourMil = (hourStr) => {
  const [hours, minutes] = hourStr.split(":");

  return timeToMilliseconds(hours, minutes);
};

function timeToMilliseconds(hours, minutes) {
  // Convert hours and minutes to milliseconds
  const hoursInMilliseconds = hours * 3600000; // 1 hour = 3600000 milliseconds
  const minutesInMilliseconds = minutes * 60000; // 1 minute = 60000 milliseconds

  // Total milliseconds
  const milliseconds = hoursInMilliseconds + minutesInMilliseconds;
  return milliseconds;
}

export const formatTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const formatDateAndTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
