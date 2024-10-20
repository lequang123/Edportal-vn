export default function formatDate(isoDateString) {
    if (!isoDateString) {
      return;
    }
    const date = new Date(isoDateString);
    const formattedDate = date.toString("MM/dd/yyyy, hh:mm a");
    return formattedDate;
}