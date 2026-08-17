// Calendar Helpers for Google Calendar and ICS file downloads

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string; // "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS"
  endDate?: string;  // "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS"
  isAllDay: boolean;
}

// Format Date for Google Calendar (YYYYMMDD or YYYYMMDDTHHMMSSZ)
const formatGoogleDate = (dateStr: string, isAllDay: boolean): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // Fallback if parsing fails
    return dateStr.replace(/[-:]/g, '');
  }

  if (isAllDay) {
    // For all-day events, the end date must be the day after
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  } else {
    // Convert to ISO and remove separators, using UTC
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }
};

// Generate Google Calendar Link
export const getGoogleCalendarUrl = (event: CalendarEvent): string => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  
  let dates = "";
  if (event.isAllDay) {
    const start = formatGoogleDate(event.startDate, true);
    // End date is next day for all-day google event
    const startDateObj = new Date(event.startDate);
    startDateObj.setDate(startDateObj.getDate() + 1);
    const end = formatGoogleDate(startDateObj.toISOString().split('T')[0], true);
    dates = `${start}/${end}`;
  } else {
    const start = formatGoogleDate(event.startDate, false);
    const end = event.endDate 
      ? formatGoogleDate(event.endDate, false)
      : formatGoogleDate(new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString(), false); // +2 hours default
    dates = `${start}/${end}`;
  }

  return `${base}&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};

// Generate and Download ICS File
export const downloadIcsFile = (event: CalendarEvent) => {
  const title = event.title.replace(/[,;]/g, '\\$&');
  const description = event.description.replace(/[,;]/g, '\\$&');
  const location = event.location.replace(/[,;]/g, '\\$&');
  
  let dtStart = "";
  let dtEnd = "";
  
  if (event.isAllDay) {
    const dateStr = event.startDate.split('T')[0].replace(/-/g, '');
    dtStart = `VALUE=DATE:${dateStr}`;
    
    // End date is day after
    const startDateObj = new Date(event.startDate);
    startDateObj.setDate(startDateObj.getDate() + 1);
    const endDateStr = startDateObj.toISOString().split('T')[0].replace(/-/g, '');
    dtEnd = `VALUE=DATE:${endDateStr}`;
  } else {
    const startObj = new Date(event.startDate);
    const endObj = event.endDate ? new Date(event.endDate) : new Date(startObj.getTime() + 2 * 60 * 60 * 1000);
    
    const formatIcsDateTime = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    dtStart = formatIcsDateTime(startObj);
    dtEnd = formatIcsDateTime(endObj);
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Muslim Wedding Invitation//NONSGML v1.0//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.toLowerCase().replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
