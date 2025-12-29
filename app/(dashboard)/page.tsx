"use client";
import { Check, Clock, User, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [now, setNow] = useState(new Date());
  const [data, setData] = useState<DashboardTypes>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/dashboard/admin"
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      setData(undefined);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <div className="flex items-start justify-between w-full border p-5 rounded-xl sticky top-2 bg-[#008B93] text-white">
        <div>
          <h1 className="font-bold text-3xl leading-none">Admin Dashboard</h1>
          <span className="font-medium text-white/70">{date}</span>
        </div>
        <div className="grid text-right">
          <span className="uppercase text-xl font-semibold leading-none">
            {time}
          </span>
          <span className="font-medium text-white/70 text-sm">Live Time (IST)</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 items-start max-h-fit">
        <div className="flex items-center border rounded-xl p-5 gap-3">
          <span>
            <User className="bg-indigo-100 p-2 rounded-full size-10 text-indigo-800" />
          </span>
          <div className="grid">
            <span>Total Employees</span>
            <span className="font-bold text-xl leading-none">
              {data?.stats.totalEmployees}
            </span>
          </div>
        </div>

        <div className="flex items-center border rounded-xl p-5 gap-3">
          <span>
            <Check className="bg-green-100 p-2 rounded-full size-10 text-green-800" />
          </span>
          <div className="grid">
            <span>Present Employees</span>
            <span className="font-bold text-xl leading-none">
              {data?.stats.presentEmployees}
            </span>
          </div>
        </div>

        <div className="flex items-center border rounded-xl p-5 gap-3">
          <span>
            <X className="bg-red-100 p-2 rounded-full size-10 text-red-800" />
          </span>
          <div className="grid">
            <span>Absent Employees</span>
            <span className="font-bold text-xl leading-none">
              {data?.stats.absentEmployees}
            </span>
          </div>
        </div>

        <div className="flex items-center border rounded-xl p-5 gap-3">
          <span>
            <Clock className="bg-amber-100 p-2 rounded-full size-10 text-amber-800" />
          </span>
          <div className="grid">
            <span>On Leave</span>
            <span className="font-bold text-xl leading-none">
              {data?.stats.employeesOnLeave}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-center h-full gap-5 *:border *:rounded-xl *:w-full *:h-full">
        <div>
          <div className="px-5 py-4 border-b w-full">
            <span className="font-medium text-lg">Leave Applications</span>
          </div>

          <div className="px-5 py-3">
            {loading && <div>loading...</div>}

            {!loading && data?.pendingLeaves.length === 0 && (
              <div>No Pending Leave Applications</div>
            )}

            {data?.pendingLeaves.map((item, index) => (
              <div key={index} className="border p-4 rounded-md">
                <p className="font-semibold text-lg">{item.user.name}</p>
                <p className="font-medium text-sm text-neutral-500">
                  {item.startDate.toLocaleString()} to{" "}
                  {item.endDate.toLocaleString()}
                </p>
                <p>{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="px-5 py-4 border-b w-full">
            <span className="font-medium text-lg">Complaints Board</span>
          </div>

          <div className="px-5 py-3">
            {loading && <div>loading...</div>}

            {!loading && data && (
              <div className="border p-4 rounded-md">
                <p className="font-semibold text-lg">
                  New Complaints : {data.complaintStats.new}
                </p>
                <p className="font-semibold text-lg">
                  In-process Complaints : {data.complaintStats.inProcess}
                </p>
                <p className="font-semibold text-lg">
                  Resolved Complaints : {data.complaintStats.resolved}
                </p>
              </div>
            )}
          </div>

          <div className="px-5 overflow-y-auto flex flex-col gap-3">
            {!loading && data?.recentComplaints.length === 0 && (
              <div>No Pending Complaints</div>
            )}

            {data?.recentComplaints.map((item, index) => (
              <div key={index} className="border p-4 rounded-md relative">
                <div className="text-[10px] px-2 py-1 rounded-full bg-red-200 text-red-700 absolute top-2 right-5 font-semibold tracking-normal">
                  New
                </div>

                <p className="font-semibold text-lg">{item.user.name}</p>
                <p className="font-medium text-sm text-neutral-500">
                  {item.description}
                </p>
                <p>{item.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
