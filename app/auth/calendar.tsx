"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";

const localizer = momentLocalizer(moment);

interface Todo {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const MyCalendar = ({ todos }: { todos: Todo[] }) => {
  const [selectedEvent, setSelectedEvent] = useState();

  const events = todos
    .filter((todo) => todo.dueDate)
    .map((todo) => ({
      id: todo.id,
      title: todo.title,
      start: new Date(todo.dueDate),
      end: new Date(todo.dueDate),
      completed: todo.completed,
    }));

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
  };



  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <div className="mt-4 rounded-lg ring-1 ring-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {selectedEvent?.start?.toDateString()}
          </h3>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-900">{selectedEvent?.title}</span>
            <span
              className={`text-xs p-2 rounded-md ${selectedEvent?.completed ? "bg-green-100" : "bg-yellow-100"}`}
            >
              {selectedEvent?.completed ? "Done" : "Pending"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
