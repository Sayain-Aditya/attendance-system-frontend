"use client";

import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const AttendanceListPage = () => {
  const [data, setData] = useState<AttendanceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rfidattendance-mu.vercel.app/api/attendance/view/${filter}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        setData([]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <div className="py-2.5 text-lg font-light">Attendance List</div>

      <DropdownMenu>
        <DropdownMenuTrigger className="mb-2.5 px-2.5 py-1.5 font-light flex items-center gap-1 bg-neutral-100 w-fit rounded-md border border-neutral-200 capitalize">
          <span className="text-sm">{filter} attendance</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => setFilter("today")}>
            Today
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setFilter("monthly")}>
            Monthly
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setFilter("all")}>
            All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {loading && <TableLoadingSkeleton />}

      {!loading && data.length === 0 && <div>no attendance record</div>}

      {!loading && data.length !== 0 && (
        <div className="flex flex-col">
          <ul className="grid grid-cols-7 items-end gap-10 w-full px-5 py-2.5 bg-neutral-100 rounded-t-lg border border-b-transparent border-neutral-200 uppercase text-xs">
            <li className="grid">
              <span className="leading-none font-medium">Employee Name</span>
              <span className="leading-none font-light">Employee ID</span>
            </li>

            <li>RFID</li>
            <li>Date</li>
            <li>Role</li>
            <li>Check In</li>
            <li>Check Out</li>
            <li>Scan Status</li>
          </ul>
          {data.map((item: AttendanceList, index: number) => (
            <ul
              key={index}
              className="grid grid-cols-7 items-center gap-10 w-full px-5 py-3.5 border-s border-e border-t last:border-b last:rounded-b-lg *:text-sm"
            >
              <li className="grid">
                <span className="leading-none font-medium">
                  {item.user.name}
                </span>
                <span
                  className={`text-[11px] font-light ${
                    !item.user.employeeId && "text-red-500"
                  }`}
                >
                  {item.user.employeeId ?? "NA"}
                </span>
              </li>

              <li className={`${!item.date && "text-red-500"}`}>
                {item.user.uid ?? "NA"}
              </li>
              <li className={`${!item.date && "text-red-500"}`}>
                {item.date ?? "NA"}
              </li>
              <li className={`${!item.user.role && "text-red-500"}`}>
                {item.user.role ?? "NA"}
              </li>
              <li className={`${!item.checkIn && "text-red-500"}`}>
                {item.checkIn ?? "NA"}
              </li>
              <li className={`${!item.checkOut && "text-red-500"}`}>
                {item.checkOut ?? "NA"}
              </li>
              <li className={`${!item.scanStatus && "text-red-500"}`}>
                {item.scanStatus ?? "NA"}
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceListPage;
