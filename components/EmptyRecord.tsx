import { CircleAlert } from "lucide-react";

const EmptyRecord = ({ message = "No Record Found" }: { message?: string }) => {
  return (
    <section className="w-full min-h-full max-h-screen flex flex-col items-center justify-center">
      <div>
        <CircleAlert className="w-15 lg:w-25 h-auto stroke-[1.25]" />
      </div>

      <div className="font-medium text-xl lg:text-3xl">{message}</div>
    </section>
  );
};

export default EmptyRecord;
