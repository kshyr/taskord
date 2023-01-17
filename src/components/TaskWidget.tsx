import TaskCard from "./TaskCard";

const TaskWidget: React.FC = () => {
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
      <TaskCard
        title="physics hw"
        description="Q11-16, p. 252"
        category="school"
        dueTime="9:00 PM"
        completed
      />
      <TaskCard
        title="physics hw"
        description="Q11-16, p. 252"
        category="school"
        dueTime="9:00 PM"
        color="bg-darkred"
      />
      <TaskCard
        title="physics hw"
        description="Q11-16, p. 252"
        category="school"
        dueTime="9:00 PM"
      />
    </section>
  );
};

export default TaskWidget;
