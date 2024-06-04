export function convertToDate(inputDateString: string) {
  // Parse the input date string into a Date object
  const date = new Date(inputDateString);

  // Helper function to pad numbers with leading zeros
  const pad = (number: number, length = 2) =>
    String(number).padStart(length, "0");

  // Extract date parts
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);

  // Get timezone offset in minutes
  const timezoneOffset = date.getTimezoneOffset();
  const absoluteOffset = Math.abs(timezoneOffset);
  const offsetHours = pad(Math.floor(absoluteOffset / 60));
  const offsetMinutes = pad(absoluteOffset % 60);
  const offsetSign = timezoneOffset <= 0 ? "+" : "-";
  const timezone = `${offsetSign}${offsetHours}${offsetMinutes}`;

  // Format the date string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${timezone}`;
}
