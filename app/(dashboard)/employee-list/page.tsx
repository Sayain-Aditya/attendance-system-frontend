"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Loading } from "./_components/Loading";

const EmployeeListPage = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/user/view/all"
      );
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json(); // Parse the response body as JSON
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      setData([]);
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="py-2.5 text-lg font-light">List Of Employees</div>

      <Suspense fallback={<Loading />}>
        {!loading && data.length === 0 && <div>no employee record found</div>}

        <div className="flex flex-col gap-2.5">
          {data.map((item: Employee) => (
            <div
              key={item.uid}
              className="flex items-center justify-start gap-10 w-full px-3 py-2.5 bg-neutral-100 rounded-2xl border border-neutral-200"
            >
              <div className="h-25 w-25 bg-neutral-400 rounded-xl" />
              <span>
                <b>Name of Employee</b>
                <br />
                {item.name}
              </span>
              <span>
                <b>UID</b>
                <br />
                {item.uid}
              </span>
              <span>
                <b>Role</b>
                <br />
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default EmployeeListPage;
