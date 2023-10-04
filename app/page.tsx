import TaskWidget from "@/components/TaskWidget";
import Image from "next/image";

async function getData() {
  const res = await fetch("https://taskord.shuttleapp.rs/");
  return res.text();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data}
      <TaskWidget />{" "}
    </main>
  );
}
