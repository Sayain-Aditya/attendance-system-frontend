"use client";

import ActionsMenu from "@/components/ActionsMenu";
import Header from "@/components/Header";
import NewAdmin from "@/components/modals/NewAdmin";
import NewEmployee from "@/components/modals/NewEmployee";
import { useFetchEmployees } from "@/hooks/useFetchEmployees";
import { cn } from "@/lib/utils";
import { AttendanceLoadingSkeleton } from "../../../components/LoadingSkeleton";

const EmployeeListPage = () => {
  const { loading, employees } = useFetchEmployees();

  return (
    <section className="space-y-5">
      <Header text="List Of Employees" />

      <div className="max-h-[83dvh] overflow-hidden flex flex-col gap-3">
        <div className="flex items-center justify-end gap-3 w-full">
          <NewEmployee />
          <NewAdmin />
        </div>

        {loading && <AttendanceLoadingSkeleton />}

        {!loading && employees?.length === 0 && (
          <div>no employee record found</div>
        )}

        <div className="flex flex-col gap-3 overflow-y-auto">
          {employees?.map((employee: Employee) => (
            <div
              key={employee.uid}
              className="flex items-center gap-5 px-3 py-2.5 bg-neutral-100 rounded-2xl border border-neutral-200"
            >
              <ActionsMenu employee={employee} />

              <div className="flex flex-col items-center relative">
                <div className="h-16 w-16 bg-neutral-400 rounded-md shrink-0 justify-self-center" />
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold w-fit h-fit absolute -bottom-2 left-1/2 -translate-x-1/2 ${
                    employee.isActive
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-500"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div
                className={cn(
                  "grid grid-cols-7 items-center gap-5 w-full",
                  "text-sm",
                  "*:flex *:flex-col *:overflow-hidden"
                )}
              >
                <div>
                  <b>Employee Name</b>
                  <span className="whitespace-nowrap">{employee.name}</span>
                </div>

                <div>
                  <b>Employee ID</b>
                  <span className={`${!employee.employeeId && "text-red-500"}`}>
                    {employee.employeeId ?? "NA"}
                  </span>
                </div>

                <div>
                  <b>UID</b>
                  <span>{employee.uid}</span>
                </div>

                <div>
                  <b>Email</b>
                  <span>{employee.email}</span>
                </div>

                <div>
                  <b>Role</b>
                  <span>{employee.role}</span>
                </div>

                <div>
                  <b>Address</b>
                  <span
                    className={`line-clamp-1 ${
                      !employee.address && "text-red-500"
                    }`}
                  >
                    {employee.address ?? "No address provided"}
                  </span>
                </div>

                <div>
                  <b>Phone Number</b>
                  <span
                    className={`line-clamp-1 ${
                      !employee.phoneNumber && "text-red-500"
                    }`}
                  >
                    {employee.phoneNumber ?? "NA"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeListPage;
