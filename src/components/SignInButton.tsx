import Link from "next/link";
import { getUserSession } from "@/src/utils/auth.utils";

export default async function SignInButton() {
  const session = await getUserSession();

  if (session && session.user) {
    return (
      <div className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold">
        {session.user.username}
        <Link href={"/api/auth/signout"}>Sign Out</Link>
      </div>
    );
  }
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold">
      <Link href={"/api/auth/signin"}>Sign In</Link>
    </button>
  );
}
