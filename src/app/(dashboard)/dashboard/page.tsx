import { getUserSession } from "@/src/utils/auth.utils";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getUserSession();

  if (session && session.user) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{session.user.username}</p>
        <Link href={"/api/auth/signout"}>Sign Out</Link>
      </div>
    );
  }
}
