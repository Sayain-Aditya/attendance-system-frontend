import React from "react";
import { Check, Clock, User, X } from "lucide-react";

const EmployeeDashboard = async () => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/dashboard/admin",
        {
          cache: "no-cache",
          next: {
            revalidate: 10,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json();
      // console.log(result.data);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const data = await fetchData();

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-5 items-start max-h-fit">
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

      <div className="max-lg:pb-5 flex flex-col lg:flex-row items-start justify-center h-full gap-5 *:border *:rounded-xl *:w-full *:h-full">
        <div>
          <div className="px-5 py-4 border-b w-full">
            <span className="font-medium text-lg">Notice Board</span>
          </div>

          <div className="px-5 py-3 overflow-y-auto flex flex-col gap-3">
            {data?.notices.length === 0 && <div>No New Notices</div>}

            {data?.notices.map((item: Notice, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-md"
              >
                <p className="font-medium text-xs text-neutral-600">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
