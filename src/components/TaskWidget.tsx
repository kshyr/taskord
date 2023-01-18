import { useState } from "react";
import TaskCard from "./TaskCard";

export type Task = {
  title: string;
  description: string;
  category: string;
  dueTime: string;
  completed?: boolean;
  color?: string;
};

const TaskWidget: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "physics hw",
      description: "Q11-16, p. 252",
      category: "school",
      dueTime: "9:00 PM",
      completed: true,
    },
    {
      title: "physics hw",
      description: "Q11-16, p. 252",
      category: "school",
      dueTime: "9:00 PM",
      color: "bg-darkred",
    },
    {
      title: "physics hw",
      description: "Q11-16, p. 252",
      category: "school",
      dueTime: "9:00 PM",
    },
  ]);

  return (
    <section className="flex flex-col items-center justify-start gap-4 rounded-lg border border-white border-opacity-75 p-4 shadow-xl">
      <div className="flex w-full  items-center justify-between">
        <h1 className="ml-8 text-2xl">
          due <u className="text-violet">today</u>
        </h1>
        <div className="ml-auto flex items-center justify-center rounded-md border p-2 shadow-inner">
          <span className="bg-red-500">date picker here</span>
        </div>
      </div>
      {tasks.map((task, i) => (
        <TaskCard key={i} {...task} />
      ))}
    </section>
  );
};

export default TaskWidget;
