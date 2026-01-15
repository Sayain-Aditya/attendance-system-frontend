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

const ActionsMenu = ({ modal }: { modal?: boolean }) => {
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
            <UpdateEmployee />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <DeleteConfirmation
              pendingFunction={() => {}}
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
