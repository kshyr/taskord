import SignInForm from "@/src/components/SignInForm";

type SignInPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold">
        <SignInForm
          callbackUrl={searchParams?.callbackUrl}
          error={searchParams?.error}
        />
      </div>
    </main>
  );
}
