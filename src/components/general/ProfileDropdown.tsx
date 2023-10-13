"use client";
import { Avatar } from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function ProfileDropdown() {
  const { data: session } = useSession();

  const dashboardLink = (
    <Link href={"/dashboard"}>
      <Button>Go to dashboard</Button>
    </Link>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.avatarUrl}></AvatarImage>
          <AvatarFallback className="flex w-full items-center justify-center rounded-full border-2">
            <User size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <Link href={"/dashboard"}>
          <DropdownMenuItem>Go to dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={"/signout"}>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
