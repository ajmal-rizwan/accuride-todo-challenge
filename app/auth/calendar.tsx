"use client"
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

interface Todo {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const MyCalendar = ({ todos }: { todos: Todo[] }) => {
  const events = todos
    .filter(todo => todo.dueDate)
    .map(todo => ({
      id: todo.id,
      title: todo.title,
      start: new Date(todo.dueDate),
      end: new Date(todo.dueDate),
      completed: todo.completed
    }))

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar
