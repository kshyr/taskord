"use client";
import SignInForm from "@/src/components/singin/SignInForm";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { useRouter } from "next/navigation";

function SignInModal() {
  const router = useRouter();

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
