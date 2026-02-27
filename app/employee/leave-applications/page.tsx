"use client";

import EmptyRecord from "@/components/EmptyRecord";
import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldContent, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/userContext";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type newLeave = {
  userId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
};

const LeaveApplications = () => {
  const user = useUser();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [data, setData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLeave, setNewLeave] = useState<newLeave>({
    userId: user?._id as string,
    startDate: new Date(),
    endDate: new Date(),
    reason: "No reason provided",
  });

  //fetch leave applications of current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rfidattendance-mu.vercel.app/api/leave/get?userId=${user?._id}`,
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
  }, [user?._id]);

  const handleNewLeave = async () => {
    setLoading(true);
    console.log("New Leave Application", newLeave);

    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/leave/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLeave),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md p-4 text-primary">
            <code>{JSON.stringify(newLeave, null, 2)}</code>
          </pre>
        ),
        position: "top-right",
      });

      //refetch notice board
      // fetchNoticeBoard();

      setNewLeave({
        ...newLeave,
        reason: "",
      });
    } catch (error) {
      console.error("Error uploading Notice:", error);
    } finally {
      setLoading(false);
      setNewLeave({
        ...newLeave,
        reason: "",
      });
    }
  };

  return (
    <section className="space-y-5">
      <Header text="Leave Applications" />

      <div className="flex flex-col gap-4 border p-5 rounded-md">
        <span className="font-semibold">New Leave Application</span>

        <Field orientation="horizontal">
          <Field>
            <Label htmlFor="new-leave-startDate">From</Label>
            <Popover>
              <PopoverTrigger
                id="new-leave-startDate"
                asChild
              >
                <Button
                  variant="outline"
                  data-empty={!newLeave.startDate}
                  className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                >
                  {newLeave.startDate ? (
                    format(newLeave.startDate, "dd-MM-yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={newLeave.startDate}
                  onSelect={(e) => setNewLeave({ ...newLeave, startDate: e! })}
                  defaultMonth={newLeave.startDate}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <Label htmlFor="new-leave-endDate">To</Label>
            <Popover>
              <PopoverTrigger
                id="new-leave-endDate"
                asChild
              >
                <Button
                  variant="outline"
                  data-empty={!newLeave.startDate}
                  className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                >
                  {newLeave.startDate ? (
                    format(newLeave.endDate, "dd-MM-yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={newLeave.startDate}
                  onSelect={(e) =>
                    setNewLeave({
                      ...newLeave,
                      endDate: e!,
                    })
                  }
                  defaultMonth={newLeave.startDate}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </Field>

        <Field>
          <Label htmlFor="new-complaint-content">Reason</Label>
          <Textarea
            id="new-complaint-content"
            placeholder="Enter Reason For Leave"
            className="placeholder:text-neutral-400"
            onChange={(e) =>
              setNewLeave({ ...newLeave, reason: e.target.value })
            }
          />
        </Field>

        <Button
          className="w-fit"
          variant="outline"
          onClick={() => handleNewLeave()}
        >
          Submit
        </Button>
      </div>

      {loading && <TableLoadingSkeleton />}

      {!loading && data.length === 0 && (
        <EmptyRecord message="No Pending Applications" />
      )}

      {!loading && data && (
        <div className="grid grid-cols-2 gap-2.5">
          {data.map((item: Leave, index: number) => {
            return (
              <div
                key={index}
                className="col-span-1 flex items-start justify-between px-3 py-2.5 bg-neutral-100 rounded-lg border border-neutral-200"
              >
                <ul className="flex flex-col gap-2 w-full *:text-sm">
                  <li className="*:text-xs flex items-center justify-between">
                    <div
                      className={`text-sm px-3 py-1 rounded-full font-semibold w-fit ${
                        item.status === "PENDING"
                          ? "bg-amber-200 text-amber-500"
                          : item.status === "APPROVED"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-500"
                      }`}
                    >
                      <span>{item.status ?? "NA"}</span>
                    </div>
                  </li>

                  <li>
                    <span>
                      {item.startDate} to {item.endDate}
                    </span>
                  </li>

                  <li className={`${!item.user.name && "text-red-500"}`}>
                    <span className="font-semibold">By : </span>
                    {item.user.name ?? "Unassigned"}
                  </li>

                  <li>
                    <span className="font-semibold">Subject : </span>
                    {item.reason}
                  </li>

                  <li>
                    <span className="font-semibold">Description : </span>
                    {item.status}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LeaveApplications;
