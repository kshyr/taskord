import TaskWidget from "@/src/components/TaskWidget";
import {request, gql} from 'graphql-request'

async function getData() {
  const res = await request(process.env.API_URL as string, gql`
    query {
      allTasks {
        id
        name
        description
        status
        priority
        createdAt
        updatedAt
      }
    }
  `);
  return JSON.stringify(res)
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
