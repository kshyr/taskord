import { useTasksStore } from "../store";
import { AnimatePresence, motion } from "framer-motion";

const TaskModal: React.FC = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const setNewTaskTitle = useTasksStore((state) => state.setNewTaskTitle);
  const newTaskTitle = useTasksStore((state) => state.newTaskTitle);
  const clearTasks = useTasksStore((state) => state.clearTasks);

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="group flex flex-col items-center justify-center gap-4 rounded-lg bg-gray py-4  shadow-lg "
      >
        <motion.h1 layout className="text-lg">
          <motion.b layout>Zustand</motion.b> test
        </motion.h1>
        <motion.input
          layout
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-4/5 rounded-md bg-black/30 p-2 outline-none"
        />
        <motion.button
          layout
          className="w-4/5 rounded-md bg-green/30 p-2 outline-none"
          onClick={() => {
            if (newTaskTitle.trim() === "") return;
            addTask(newTaskTitle);
            setNewTaskTitle("");
          }}
        >
          Add task
        </motion.button>
        <motion.button
          layout
          className="w-4/5 rounded-md bg-darkred/90 p-2 outline-none"
          onClick={() => clearTasks()}
        >
          Clear
        </motion.button>
        {tasks.map((task) => (
          <motion.div
            layout
            key={task}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {task}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
