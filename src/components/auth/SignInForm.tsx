"use client";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { InputWithIcon } from "../ui/input";
import { Label } from "../ui/label";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/utils/styles.utils.ts";
import { register } from "@/src/graphql/mutations.ts";

type SignInFormProps = {
  callbackUrl?: string;
  error?: string;
};

export default function SignInForm({ callbackUrl, error }: SignInFormProps) {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerMode, setRegisterMode] = useState(false);

  if (sessionStatus === "loading") {
    return null;
  } else if (sessionStatus === "authenticated") {
    router.replace("/dashboard");
    return null;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    if (registerMode) {
      try {
        await register(email, username, password);
      } catch (e) {
        console.log(e);
        return;
      }
    }

    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: callbackUrl ?? "/dashboard",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-64 flex-col items-center gap-2"
    >
      <div className="flex gap-4">
        <h1
          className={cn(
            "mb-2 text-2xl font-bold",
            registerMode &&
              "cursor-pointer font-semibold text-muted-foreground",
          )}
          onClick={() => setRegisterMode(false)}
        >
          Sign in
        </h1>
        <h1
          className={cn(
            "mb-2 text-2xl font-bold",
            registerMode ||
              "cursor-pointer font-semibold text-muted-foreground",
          )}
          onClick={() => setRegisterMode(true)}
        >
          Register
        </h1>
      </div>
      {!!error && (
        <p className="absolute -top-8 text-red-500">Invalid credentials</p>
      )}
      {registerMode && (
        <>
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <InputWithIcon
            icon={<Mail size={20} />}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </>
      )}
      <Label className="sr-only" htmlFor="username">
        Username
      </Label>
      <InputWithIcon
        icon={<User size={20} />}
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Label className="sr-only" htmlFor="password">
        Password
      </Label>
      <InputWithIcon
        className="w-full"
        icon={<Lock size={20} />}
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" className="mt-2 w-full">
        {registerMode ? "Register" : "Sign In"}
      </Button>
    </form>
  );
}
