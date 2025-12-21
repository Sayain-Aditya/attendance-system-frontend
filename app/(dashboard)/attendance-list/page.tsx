"use client";

import React, { useEffect, useState } from "react";

type AttendanceList = {
  checkIn: string;
  checkOut: string;
  date: string;
  scanStatus: string;
  user: {
    name: string;
    role: string;
    uid: string;
  };
};

const AttendanceListPage = () => {
  const [data, setData] = useState<AttendanceList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://rfidattendance-mu.vercel.app/api/attendance/view"
      );

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      setData([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      attendance list
      {loading && <div>loading...</div>}
      {!loading && data.length === 0 && <div>no attendance record</div>}
      {!loading && data && (
        <div className="flex flex-col gap-5">
          {data.map((item: AttendanceList, index: number) => (
            <div key={index}>
              <ul>
                <li>{item.checkIn}</li>
                <li>{item.checkOut}</li>
                <li>{item.date}</li>
                <li>{item.scanStatus}</li>
                <li>{item.user.name}</li>
                <li>{item.user.role}</li>
                <li>{item.user.uid}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceListPage;
