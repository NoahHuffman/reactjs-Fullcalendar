import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <div>
        <button onClick={handleAddAllDayEvent}>Add All-Day Event</button>
        <button onClick={handleAddTimedEvent}>Add Timed Event</button>
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
      />
    </div>
  );
}

export default Calendar;
