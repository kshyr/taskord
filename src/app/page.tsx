import TaskWidget from "@/src/components/TaskWidget";
import SignInButton from "@/src/components/SignInButton";
import { getUserSession } from "@/src/utils/auth.utils";

export default async function Home() {
  const data = await getUserSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
      <SignInButton />
      <TaskWidget />
    </main>
  );
}
