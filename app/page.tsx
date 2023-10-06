import TaskWidget from "@/components/TaskWidget";

async function getData() {
  const res = await fetch(process.env.API_URL as string);
  return res.text();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data}
      <TaskWidget />
    </main>
  );
}
