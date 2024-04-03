import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState("standard"); // Initialize theme state

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Update the theme state with the new theme
  };
  
  const handleEventAdd = (event) => {
    setEvents([...events, event]); // Add the new event to the events array
  };

  const handleAddAllDayEvent = () => {
    const title = prompt("Please enter a title for your all-day event:");
    if (title) {
      // Prompt user to select a date for the event
      const selectedDate = prompt("Please select a date for your all-day event (YYYY-MM-DD):");
      if (selectedDate) {
        const newEvent = {
          title,
          start: selectedDate,
          allDay: true,
        };
        handleEventAdd(newEvent);
      }
    }
  };

  const handleAddTimedEvent = () => {
    const title = prompt("Please enter a title for your timed event:");
    if (title) {
      const selectedDate = prompt("Please select a date for your timed event (YYYY-MM-DD):");
      if (selectedDate) {
        const startTime = prompt("Please enter the start time for your event (HH:mm):");
        const endTime = prompt("Please enter the end time for your event (HH:mm):");

        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");
        startDate.setHours(startHour, startMinute);
        endDate.setHours(endHour, endMinute);

        const newEvent = {
          title,
          start: startDate,
          end: endDate,
          allDay: false,
        };

        handleEventAdd(newEvent);
      }
    }
  };

  const updateClasses = () => {
    // Dummy JSON data for classes
    const classes = [
      { title: "Math Class", start: "2024-04-01", allDay: false },
      { title: "Science Class", start: "2024-04-02", allDay: false },
      { title: "History Class", start: "2024-04-03", allDay: false },
    ];
  
    // Filter out classes that already exist in the events array
    const newClasses = classes.filter((classEvent) => {
      return !events.some((event) => event.title === classEvent.title && event.start === classEvent.start);
    });
  
    // Add new classes to the events array
    setEvents([...events, ...newClasses]);
  };
  
  const updateAssignments = () => {
    // Dummy JSON data for assignments
    const assignments = [
      { title: "Math Assignment", start: "2024-04-05", allDay: true },
      { title: "Science Assignment", start: "2024-04-06", allDay: true },
      { title: "History Assignment", start: "2024-04-07", allDay: true },
    ];
  
    // Filter out assignments that already exist in the events array
    const newAssignments = assignments.filter((assignment) => {
      return !events.some((event) => event.title === assignment.title && event.start === assignment.start);
    });
  
    // Add new assignments to the events array
    setEvents([...events, ...newAssignments]);
  };
  

  return (
    <div>
      <div>
        <button onClick={handleAddAllDayEvent}>Add All-Day Event</button>
        <button onClick={handleAddTimedEvent}>Add Timed Event</button>
        <button onClick={updateClasses}>Update Classes</button>
        <button onClick={updateAssignments}>Update Assignments</button>
        {/* Theme change buttons */}
        <button onClick={() => handleThemeChange("standard")}>Standard Theme</button>
        <button onClick={() => handleThemeChange("bootstrap")}>Bootstrap Theme</button>
        {/* Add more theme buttons as needed */}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        select={(info) => {
          const title = prompt("Please enter a title for your event:");
          if (title) {
            const newEvent = {
              title,
              start: info.startStr,
              end: info.endStr,
              allDay: info.allDay,
            };
            handleEventAdd(newEvent);
          }
        }}
        themeSystem={theme} // Set the themeSystem prop based on the selected theme
      />
    </div>
  );  
}

export default Calendar;
