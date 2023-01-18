import { useTasksStore } from "../store";

const TaskModal: React.FC = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const setNewTaskTitle = useTasksStore((state) => state.setNewTaskTitle);
  const newTaskTitle = useTasksStore((state) => state.newTaskTitle);
  const clearTasks = useTasksStore((state) => state.clearTasks);
  return (
    <div className="group flex flex-col  items-center justify-center gap-4 rounded-lg bg-gray py-4  shadow-lg outline outline-transparent transition-all duration-200 hover:outline-white">
      <h1 className="text-lg">
        <b>Zustand</b> test
      </h1>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="w-4/5 rounded-md bg-black/30 p-2 outline-none"
      />
      <button
        className="w-4/5 rounded-md bg-green/30 p-2 outline-none"
        onClick={() => {
          addTask(newTaskTitle);
          setNewTaskTitle("");
        }}
      >
        Add task
      </button>
      {tasks.map((task) => (
        <h2 key={task}>{task}</h2>
      ))}
    </div>
  );
};

export default TaskModal;
