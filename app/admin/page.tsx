import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default async function Home() {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/dashboard/admin",
        { next: { revalidate: 60 } }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json();
      console.log(result.data);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const data = await fetchData();

  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <Header />

      <Dashboard data={data} />
    </section>
  );
}
