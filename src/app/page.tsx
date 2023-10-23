import LandingHeader from "@/src/components/landing/Header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex flex-1 flex-col items-center justify-between bg-neutral-900 p-24"></main>
    </div>
  );
}
