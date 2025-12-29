"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AttendanceListPage = () => {
  const [data, setData] = useState<AttendanceList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/attendance/view/all"
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="py-2.5 text-lg font-light">Attendance List</div>

      <DropdownMenu>
        <DropdownMenuTrigger className="mb-2.5 px-2.5 py-1.5 font-light flex items-center gap-1 bg-neutral-100 w-fit rounded-md border border-neutral-200">
          <span className="text-sm">Filters</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {loading && <div>loading...</div>}

      {!loading && data.length === 0 && <div>no attendance record</div>}

      {!loading && data && (
        <div className="flex flex-col gap-5">
          {data.map((item: AttendanceList, index: number) => (
            <div key={index}>
              <ul className="grid grid-cols-6 gap-10 w-full px-3 py-2.5 bg-neutral-100 rounded-2xl border border-neutral-200">
                <li className="grid">
                  <span className="leading-none font-medium">{item.user.name}</span>
                  <span className="text-xs font-light">{item.user.uid}</span>
                </li>

                <li>{item.user.role}</li>
                <li>{item.checkIn}</li>
                <li>{item.checkOut}</li>
                <li>{item.date}</li>
                <li>{item.scanStatus}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceListPage;
