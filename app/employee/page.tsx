import EmployeeDashboard from "@/components/EmployeeDashboard";
import Header from "@/components/Header";
import { DashboardLoadingSkeleton } from "@/components/LoadingSkeleton";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <Header user={user} />

      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <EmployeeDashboard />
      </Suspense>
    </section>
  );
}
