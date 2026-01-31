import EmployeeDashboard from "@/components/EmployeeDashboard";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <Header text="Welcome, User" />

      <EmployeeDashboard />
    </section>
  );
}
