import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

type DeleteConfirmationProps = {
  pendingFunction: () => void;
  variant?:
    | "default"
    | "ghost"
    | "destructive"
    | "secondary"
    | "link"
    | "outline";
  title?: string;
  message?: string;
  customClassName?: string | undefined;
};

const DeleteConfirmation = ({
  pendingFunction,
  variant = "default",
  title = "Remove Employee",
  message = "Are you sure you want to remove?",
  customClassName,
}: DeleteConfirmationProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant={variant}
            className={customClassName}
          >
            <Trash size={16} />
            Remove
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-red-600 font-medium">
              {message}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:flex-col items-end">
            <DialogClose
              asChild
              className="w-fit"
            >
              <Button
                type="button"
                variant="destructive"
                onClick={pendingFunction}
              >
                Confirm
              </Button>
            </DialogClose>
            <div className="text-xs font-medium text-red-400">
              <span>Note : This action cannot be undone</span>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteConfirmation;
