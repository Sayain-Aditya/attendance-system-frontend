import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, EllipsisVertical } from "lucide-react";
import DeleteConfirmation from "./modals/DeleteConfirmation";
import UpdateEmployee from "./modals/UpdateEmployee";
import { toast } from "sonner";
import { useFetchEmployees } from "@/hooks/useFetchEmployees";

const ActionsMenu = ({
  modal,
  employee,
}: {
  modal?: boolean;
  employee: Employee;
}) => {
  const { setLoading } = useFetchEmployees();

  const handleDelete = async (userId: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://rfidattendance-mu.vercel.app/api/user/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      toast("You Deleted the following employee:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md p-4 text-primary">
            <code>{JSON.stringify(employee, null, 2)}</code>
          </pre>
        ),
        position: "top-right",
      });
    } catch (error) {
      console.error("Error fetching next employee ID:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu modal={modal ?? false}>
        <DropdownMenuTrigger>
          <EllipsisVertical size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-24"
        >
          <DropdownMenuItem className="focus:bg-primary-1/20 cursor-pointer">
            <Calendar color="black" />
            See Attendance
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <UpdateEmployee employee={employee} />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <DeleteConfirmation
              pendingFunction={() => handleDelete(employee._id)}
              variant="destructive"
              customClassName="w-full justify-start"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsMenu;
