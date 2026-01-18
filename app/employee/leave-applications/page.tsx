"use client";

import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LeaveApplications = () => {
  const [data, setData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/leave/get"
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

  const handleComplaintStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `https://rfidattendance-mu.vercel.app/api/leave/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      toast("The Leave Status been updated", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md p-4 text-primary">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: "top-right",
      });
    } catch (error) {
      console.error("Error fetching next employee ID:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="space-y-5">
      <Header text="Leave Applications" />

      {loading && <TableLoadingSkeleton />}

      {!loading && data.length === 0 && <div>no attendance record</div>}

      {!loading && data && (
        <div className="flex flex-col gap-2.5">
          {data.map((item: Leave, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-neutral-100 rounded-lg border border-neutral-200 gap-16"
            >
              <ul className="flex items-center justify-between gap-10 w-full *:basis-1/4 *:text-sm">
                <li className="font-medium">{item.reason}</li>

                <li>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold w-fit ${
                      item.status === "PENDING"
                        ? "bg-amber-200 text-amber-500"
                        : item.status === "APPROVED"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {item.status ?? "NA"}
                  </span>
                </li>

                <li className={`${!item.user.name && "text-red-500"}`}>
                  {item.user.name ?? "Unassigned"}
                </li>

                <li className={`${!item.user.uid && "text-red-500"}`}>
                  {item.user.uid ?? "No Employee Id"}
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-200 hover:bg-green-300"
                  onClick={() => handleComplaintStatus(item._id, "APPROVED")}
                  disabled={
                    item.status === "APPROVED" || item.status !== "PENDING"
                  }
                >
                  <Check />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleComplaintStatus(item._id, "REJECTED")}
                  disabled={
                    item.status === "REJECTED" || item.status !== "PENDING"
                  }
                >
                  <X />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LeaveApplications;
