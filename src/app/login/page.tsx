import request, { gql } from "graphql-request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Login() {
  async function login(formData: FormData) {
    "use server";
  }

  return (
    <main className="flex">
      <form className="flex flex-col" action={login}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
