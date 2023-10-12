"use client";
import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutForm() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Sign out</h1>
      <p className="font-xl font-normal">Are you absolutely sure?</p>
      <Button onClick={() => signOut({ callbackUrl: "/" })} className="w-full">
        Sign out
      </Button>
    </div>
  );
}
