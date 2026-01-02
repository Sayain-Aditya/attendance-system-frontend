"use client";

import ActionsMenu from "@/components/ActionsMenu";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { AttendanceLoadingSkeleton } from "../../../components/LoadingSkeleton";
import { cn } from "@/lib/utils";

const EmployeeListPage = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/user/view/all",
        {
          cache: "no-store",
        }
      );
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json(); // Parse the response body as JSON
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      setData([]);
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="space-y-5">
      <Header text="List Of Employees" />

      {loading && <AttendanceLoadingSkeleton />}

      {!loading && data.length === 0 && <div>no employee record found</div>}

      <div className="flex flex-col gap-2.5">
        {data.map((employee: Employee) => (
          <div
            key={employee.uid}
            className="flex items-center px-3 py-2.5 bg-neutral-100 rounded-2xl border border-neutral-200"
          >
            <div className="mr-5">
              <ActionsMenu />
            </div>

            <span
              className={`text-sm px-3 py-1 rounded-full font-semibold w-fit h-fit ${
                employee.isActive
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-500"
              }`}
            >
              {employee.isActive ? "Active" : "Inactive"}
            </span>

            <div
              className={cn(
                "grid grid-cols-6 items-center gap-5 w-full",
                "text-sm",
                "*:flex *:flex-col"
              )}
            >
              <div className="h-16 w-16 bg-neutral-400 rounded-md shrink-0 justify-self-center" />

              <div>
                <b>Employee Name</b>
                <span>{employee.name}</span>
              </div>

              <div>
                <b>Employee ID</b>
                <span className={`${!employee.employeeId && "text-red-500"}`}>
                  {employee.employeeId ?? "NA"}
                </span>
              </div>

              <div>
                <b>UID</b>
                <span>{employee.uid}</span>
              </div>

              <div>
                <b>Role</b>
                <span>{employee.role}</span>
              </div>

              <div>
                <b>Address</b>
                <span
                  className={`line-clamp-1 ${
                    !employee.address && "text-red-500"
                  }`}
                >
                  {employee.address ?? "No address provided"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeListPage;
