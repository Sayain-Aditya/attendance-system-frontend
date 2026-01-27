import AdminDashboard from "@/components/AdminDashboard";
import Header from "@/components/Header";
import { DashboardLoadingSkeleton } from "@/components/LoadingSkeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <Header />

      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </section>
  );
}
