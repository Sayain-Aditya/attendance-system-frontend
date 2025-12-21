"use client";

import React, { useEffect, useState } from "react";

type Employee = {
  name: string;
  uid: string;
  role: string;
};

const EmployeeListPage = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an asynchronous function to fetch the data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rfidattendance-mu.vercel.app/api/user"
        );
        // Check if the response is OK (status in the 200-299 range)
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

    fetchData();
  }, []);

  return (
    <div>
      employee list
      {loading && <div>loading...</div>}
      {!loading && data && (
        <>
          {data.map((item: Employee, index: number) => (
            <div key={index}>
              {item.name} {item.uid} {item.role}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeListPage;
