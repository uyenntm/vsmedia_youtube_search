function format_number(number) {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    number
  );
}

function format_date(date) {
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "America/Los_Angeles"
  };
  return new Intl.DateTimeFormat("en-US", options).format(Date.parse(date));
}

function showElement(id) {
  document.getElementById(id).style.visibility = "visible";
}

function hideElement(id) {
  document.getElementById(id).style.visibility = "hidden";
}
