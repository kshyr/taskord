import { type NextPage } from "next";


import { api } from "../../utils/api";

const SavedTasks: NextPage = () => {
  const tasks = api.tasks.getTasks.useQuery(undefined, {});

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      <header>
        <h1 className="text-2xl text-white">Saved Tasks</h1>
      </header>
      <div className="flex flex-col gap-3">
        {tasks.data?.map((task) => (
          <div key={task.id} className="flex gap-3">
            <span className="text-white">{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTasks;
