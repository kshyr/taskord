import Link from "next/link";

export default async function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold">
        Hi
        <Link href={"/signin"}>Sign In</Link>
      </div>
    </main>
  );
}
