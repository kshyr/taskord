import Link from "next/link";
import { getUserSession } from "@/src/utils/auth.utils";
import { Button } from "@/src/components/ui/button";
import LandingHeader from "@/src/components/landing/Header";

export default async function LandingPage() {
  const session = await getUserSession();
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex flex-1 flex-col items-center justify-between bg-neutral-900 p-24"></main>
    </div>
  );
}
