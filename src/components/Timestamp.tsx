interface TimestampProps {
  timestamp: number;
}

function Timestamp({ timestamp }: TimestampProps) {
  const formatTwitterLikeDate = (milliseconds: number): string => {
    const now = new Date().getTime();
    const diff = now - milliseconds;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) {
      const seconds = Math.max(Math.floor(diff / 1000), 1);
      return `${seconds}s`;
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}m`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours}h`;
    } else {
      const date = new Date(milliseconds);
      const monthNames = [
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
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      return `${month} ${day}`;
    }
  };

  const formattedDate = formatTwitterLikeDate(timestamp);

  return <span className="timestamp">{formattedDate}</span>;
}

export default Timestamp;
