"use client";

import EmptyRecord from "@/components/EmptyRecord";
import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const NoticeBoard = () => {
  const [data, setData] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    priority: "MEDIUM",
    createdBy: "694d04e6554aaa1dcac1de66",
  });

  const fetchNoticeBoard = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/notice",
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const result = await response.json();
      setData(result.notices);
      console.log(result.notices);
    } catch (err) {
      setData([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticeBoard();
  }, []);

  return (
    <section className="space-y-5">
      <Header text="Notice Board" />

      {loading && <TableLoadingSkeleton />}

      {!loading && data.length === 0 && <EmptyRecord message="No New Notice" />}

      {!loading && data && (
        <>
          <div className="grid grid-cols-2 gap-2.5">
            {data.map((item: Notice, index: number) => (
              <div
                key={index}
                className={`col-span-1 flex flex-col items-end justify-between p-3 rounded-lg border border-neutral-200 gap-5 bg-neutral-100`}
              >
                <ul className="flex flex-col items-start justify-between gap-1 w-full *:text-sm">
                  <li className="pl-1 w-full flex items-center justify-between">
                    <b>{item.title}</b>

                    <div className="text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        dateStyle: "long",
                      })}
                    </div>
                  </li>

                  <li className="bg-white py-1 px-2 w-full rounded-md h-20 overflow-y-scroll">
                    {item.content}
                  </li>

                  <li>{item.priority}</li>
                </ul>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Pencil />
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                  >
                    <Trash />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default NoticeBoard;
