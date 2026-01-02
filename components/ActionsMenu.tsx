import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, EllipsisVertical, Pencil, Trash } from "lucide-react";

const ActionsMenu = ({ modal }: { modal?: boolean }) => {
  return (
    <>
      <DropdownMenu modal={modal ?? false}>
        <DropdownMenuTrigger>
          <EllipsisVertical size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-24">
          <DropdownMenuItem className="focus:bg-primary-1/20">
            <Calendar />
            See Attendance
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-primary-1/20">
            <Pencil />
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-red-300">
            <Trash />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsMenu;
