"use client";
import SignInForm from "@/src/components/singin/SignInForm";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function SignInModal() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "loading") {
    return null;
  } else if (sessionStatus === "authenticated") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && router.back()}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-[305px]"
      >
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}

export default SignInModal;
