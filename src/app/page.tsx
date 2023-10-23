import LandingHeader from "@/src/components/landing/Header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="bg-darker flex flex-1 flex-col items-center justify-between p-24"></main>
    </div>
  );
}
