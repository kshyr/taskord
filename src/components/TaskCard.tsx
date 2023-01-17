import { useState } from "react";

type Props = {
  title: string;
  description?: string;
  category?: string;
  dueTime: string;
  completed?: boolean;
};

const TaskCard: React.FC<Props> = ({
  title,
  description,
  category,
  dueTime,
  completed = false,
}: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  return (
    <div className="group flex w-full gap-4 rounded-lg bg-violet px-4 shadow-lg outline outline-transparent transition-all duration-200 hover:outline-white">
      <div className="flex items-center justify-center">
        <div
          className={`h-8 w-8 rounded-full border border-white border-opacity-0 bg-black shadow-inner transition duration-200 hover:border-opacity-100 ${
            isCompleted ? "bg-green" : "bg-black"
          }`}
          onClick={() => setIsCompleted(!isCompleted)}
        ></div>
      </div>
      <div className="transition-colros border-r border-black border-opacity-75 duration-200 group-hover:border-white"></div>
      <div className="my-4 flex flex-col items-start justify-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="opacity-75">{description}</p>
        <div className="mt-2 rounded-xl bg-[#413681] px-2">{category}</div>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-bold">{dueTime}</h3>
      </div>
    </div>
  );
};

export default TaskCard;
