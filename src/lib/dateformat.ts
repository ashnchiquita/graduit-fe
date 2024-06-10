export function formatDate(date: Date): string {
  // Months array to convert month index to month name
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, year, hour, and minute from the Date object
  const day: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();

  // Format the date string
  const formattedDate: string = `${day} ${months[monthIndex]} ${year}, ${hour < 10 ? "0" : ""}${hour}.${minute < 10 ? "0" : ""}${minute}`;

  return formattedDate;
}
