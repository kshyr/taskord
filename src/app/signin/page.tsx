import SignInForm from "@/src/components/singin/SignInForm";

type SignInPageProps = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm
        callbackUrl={searchParams?.callbackUrl}
        error={searchParams?.error}
      />
    </div>
  );
}
