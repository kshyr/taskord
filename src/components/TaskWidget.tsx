const TaskWidget: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-start gap-4 rounded-lg border border-white border-opacity-75 p-4 shadow-xl">
      <div className="flex w-full  items-center justify-between">
        <h1 className="text-2xl">
          due <u className="text-violet">today</u>
        </h1>
        <div className="ml-auto flex items-center justify-center rounded-md border p-2 shadow-inner">
          <span className="bg-red-500">date picker here</span>
        </div>
      </div>
      <div className="group flex w-full gap-4 rounded-lg bg-violet px-4 shadow-lg outline outline-transparent transition-all duration-200 hover:outline-white">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border border-white border-opacity-0 bg-black shadow-inner transition duration-200 hover:border-opacity-100"></div>
        </div>
        <div className="transition-colros border-r border-black border-opacity-75 duration-200 group-hover:border-white"></div>
        <div className="my-4 flex flex-col items-start justify-center">
          <h2 className="text-xl font-bold">physics hw</h2>
          <p className="opacity-75">Q11-16, p. 252</p>
          <div className="mt-2 rounded-xl bg-[#413681] px-2">School</div>
        </div>
        <div className="flex items-center justify-center">
          <h3 className="text-2xl font-bold">9:00 PM</h3>
        </div>
      </div>
    </section>
  );
};

export default TaskWidget;
