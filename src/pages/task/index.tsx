import { type FormEvent, useState } from "react";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "../../utils/api";
import TaskWidget from "../../components/TaskWidget";

const NewTask: NextPage = () => {
  const [task, setTask] = useState<string>("");

  const createTask = api.tasks.createTask.useMutation();

  const router = useRouter();

  const handleSubmitTask = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitting task");
    createTask
      .mutateAsync({ title: task })
      .then(() => {
        void router.push("/saved");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex h-full flex-col items-center justify-around">
      <TaskWidget />
      <Link href={"/saved"}>
        <span
          className="rounded-full bg-white/10 px-10 py-3 font-semibold
            text-white no-underline transition hover:bg-white/20"
        >
          Saved Tasks
        </span>
      </Link>

      <form
        className="flex flex-col gap-5 sm:flex-row"
        onSubmit={handleSubmitTask}
      >
        <input
          required
          className="rounded-full bg-white/10 px-10 py-3 font-semibold
            text-white no-underline transition hover:bg-white/20"
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold
            text-white no-underline transition hover:bg-white/20"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTask;
