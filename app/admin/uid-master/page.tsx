"use client";

import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
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
        <div className="flex flex-col gap-3">
          {data.map((item: UID, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-neutral-100 rounded-lg border border-neutral-200 gap-16"
            >
              <ul className="grid grid-cols-4 gap-10 w-full">
                <li>{item.uid}</li>
                <li
                  className={`text-sm px-3 py-1 rounded-full font-semibold w-fit ${
                    item.isUsed
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-500"
                  }`}
                >
                  {item.isUsed ? "Active" : "Inactive"}
                </li>
                <li>{item.employeeName ?? "--"}</li>
                <li>{item.employeeUID ?? "--"}</li>
              </ul>

              <div className="flex items-center gap-5">
                <button className="px-2.5 py-1 bg-white rounded-md border border-neutral-800 flex items-center justify-center gap-2">
                  <Pencil size={14} />
                  Update
                </button>
                <button className="px-2.5 py-1 bg-red-400 rounded-md border border-neutral-800 text-white flex items-center justify-center gap-2">
                  <Trash size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UIDMaster;
