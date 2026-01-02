"use client";

import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const UIDMaster = () => {
  const [data, setData] = useState<UID[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/uid-master/view/all"
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const result = await response.json();
      setData(result.uids);
      console.log(result.uids);
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
    <section className="space-y-5">
      <Header text="UID Master" />

      {loading && <TableLoadingSkeleton />}

      {!loading && data.length === 0 && <div>no attendance record</div>}

      {!loading && data && (
        <div className="flex flex-col gap-2.5">
          {data.map((item: UID, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-neutral-100 rounded-lg border border-neutral-200 gap-16"
            >
              <ul className="flex items-center justify-between gap-10 w-full *:basis-1/4 *:text-sm">
                <li className="font-medium">{item.uid}</li>

                <li>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold w-fit ${
                      item.isUsed
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {item.isUsed ? "Active" : "Inactive"}
                  </span>
                </li>

                <li className={`${!item.employeeName && "text-red-500"}`}>
                  {item.employeeName ?? "Unassigned"}
                </li>

                <li className={`${!item.employeeId && "text-red-500"}`}>
                  {item.employeeId ?? "No Employee Id"}
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline">
                  <Pencil />
                  Update
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UIDMaster;
