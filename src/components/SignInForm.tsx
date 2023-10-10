"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

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
    <div>
      {!!error && <p className="text-red-500">Invalid credentials</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
