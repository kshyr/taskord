"use client";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import SignOutForm from "@/src/components/auth/SignOutForm";
import { useRouter } from "next/navigation";

export default function SignOutModal() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-w-[305px]">
        <SignOutForm />
      </DialogContent>
    </Dialog>
  );
}
