"use client";

import Header from "@/components/Header";
import { TableLoadingSkeleton } from "@/components/LoadingSkeleton";
import DeleteConfirmation from "@/components/modals/DeleteConfirmation";
import NewUID from "@/components/modals/NewUID";
import UpdateUID from "@/components/modals/UpdateUID";
import { useFetchUID } from "@/hooks/useFetchUID";
import { toast } from "sonner";

const UIDMaster = () => {
  const { UIDs, loading, fetchAllUID, setLoading } = useFetchUID();

  const DeleteUID = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rfidattendance-mu.vercel.app/api/uid-master/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UIDs),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      const result = await response.json();
      console.log("Deleted UID", result.uids);

      toast("You Deleted the following UID:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md p-4 text-primary">
            <span>{JSON.stringify(result, null, 2)}</span>
          </pre>
        ),
        position: "top-right",
      });

      fetchAllUID();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-5">
      <Header text="UID Master" />

      {loading && <TableLoadingSkeleton />}

      {!loading && UIDs.length === 0 && <div>no attendance record</div>}

      {!loading && UIDs && (
        <div className="flex flex-col gap-2.5">
          {!loading && (
            <NewUID
              fetchUID={fetchAllUID}
              position="self-end"
            />
          )}

          {UIDs.map((item: UID, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-neutral-100 rounded-lg border border-neutral-200 gap-16"
            >
              <ul className="flex items-center justify-between gap-10 w-full *:basis-1/4 *:text-sm">
                <li className="font-medium">{item.uid}</li>

                <li>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold w-fit ${
                      item.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {item.status}
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
                <UpdateUID
                  UID={item}
                  loading={loading}
                  setLoading={setLoading}
                  fetchAllUID={fetchAllUID}
                />

                <DeleteConfirmation
                  pendingFunction={() => DeleteUID(item._id)}
                  variant="destructive"
                  title="Remove UID"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UIDMaster;
