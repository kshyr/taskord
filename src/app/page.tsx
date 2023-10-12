import Link from "next/link";
import { getUserSession } from "@/src/utils/auth.utils";
import { Button } from "@/src/components/ui/button";

export default async function LandingPage() {
  const session = await getUserSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <Link href={"/dashboard"}>
          <Button>Go to dashboard</Button>
        </Link>
      ) : (
        <Link href={"/signin"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </main>
  );
}
