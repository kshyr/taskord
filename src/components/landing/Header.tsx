import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { getUserSession } from "@/src/utils/auth.utils";
import ProfileDropdown from "@/src/components/general/ProfileDropdown";

export default async function LandingHeader() {
  const session = await getUserSession();
  return (
    <header className="flex w-full items-center justify-between border-b-2 bg-black px-4 py-2 pr-6">
      <div className="flex items-center justify-center">
        <Image
          src="/static/icons/logo.svg"
          width={64}
          height={64}
          alt="logo"
          draggable={false}
        />
        <h1 className="hidden select-none font-head text-4xl sm:block">
          task
          <span className="text-success-border">ord</span>
        </h1>
      </div>
      <div className="flex items-center gap-8">
        {/* <nav></nav> */}

        {session ? (
          <ProfileDropdown />
        ) : (
          <Link href={"/signin"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
