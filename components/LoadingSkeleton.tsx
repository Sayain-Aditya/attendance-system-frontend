import { Skeleton } from "@/components/ui/skeleton";

const TableLoadingSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

const AttendanceLoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-5">
        <Skeleton className="h-28 w-28 rounded-2xl" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-125" />
          <Skeleton className="h-10 w-125" />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <Skeleton className="h-28 w-28 rounded-2xl" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-125" />
          <Skeleton className="h-10 w-125" />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <Skeleton className="h-28 w-28 rounded-2xl" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-125" />
          <Skeleton className="h-10 w-125" />
        </div>
      </div>
    </div>
  );
};

const DashboardLoadingSkeleton = () => {
  return (
    <div className="space-y-5 h-full flex flex-col">
      <div className="flex items-center space-x-5">
        <Skeleton className="h-22 w-1/4 rounded-2xl" />
        <Skeleton className="h-22 w-1/4 rounded-2xl" />
        <Skeleton className="h-22 w-1/4 rounded-2xl" />
        <Skeleton className="h-22 w-1/4 rounded-2xl" />
      </div>

      <div className="h-full flex items-center justify-center space-x-5">
        <Skeleton className="h-full w-1/3 rounded-2xl" />
        <Skeleton className="h-full w-1/3 rounded-2xl" />
        <Skeleton className="h-full w-1/3 rounded-2xl" />
      </div>
    </div>
  );
};

export {
  TableLoadingSkeleton,
  AttendanceLoadingSkeleton,
  DashboardLoadingSkeleton,
};
