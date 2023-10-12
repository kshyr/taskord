"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { InputWithIcon } from "../ui/input";
import { Label } from "../ui/label";
import { Lock, User } from "lucide-react";

type SignInFormProps = {
  callbackUrl?: string;
  error?: string;
};

function SignInForm({ callbackUrl, error }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
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
      <h1 className="mb-2 text-2xl font-bold">Sign in</h1>
      {!!error && (
        <p className="absolute -top-8 text-red-500">Invalid credentials</p>
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
        Sign In
      </Button>
    </form>
  );
}

export default SignInForm;
