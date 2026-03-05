"use client";

import Header from "@/components/Header";
import { DashboardLoadingSkeleton } from "@/components/LoadingSkeleton";
import { useUser } from "@/contexts/userContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";

const EmployeeCalendar = () => {
  const [attendance, setAttendance] = useState<AttendanceList[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });
  const user = useUser();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);

        const month = currentMonth.toISOString().slice(0, 7);
        console.log(month);
        const response = await fetch(
          `https://rfidattendance-mu.vercel.app/api/attendance/view/monthly?month=${month}`,
        );
        const data = await response.json();

        if (data.success) {
          const userAttendance = data.summary.find(
            (s: AttendanceList) => s.user._id === user?._id,
          );
          if (userAttendance) {
            setAttendance(userAttendance.records);
            setStats({
              present: userAttendance.presentDays,
              absent: userAttendance.absentDays,
              total: userAttendance.totalDays,
            });
          } else {
            setAttendance([]);
            setStats({ present: 0, absent: 0, total: 0 });
          }
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [currentMonth, user?._id]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add rest of the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getAttendanceForDate = (day: number | null) => {
    if (!day) return;

    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return attendance.find((a: AttendanceList) => a.date === dateStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
      case "OUT":
        return "bg-green-100 text-green-800 border-green-200";
      case "IN":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ABSENT":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="space-y-5 relative h-full flex flex-col">
      <Header text="Attendance Record" />

      {loading && <DashboardLoadingSkeleton />}

      {!loading && (
        <div className="space-y-6 w-full">
          {/* Stats */}
          <div className="grid lg:grid-cols-3 gap-5 items-start max-h-fit">
            <div className="flex items-center border rounded-xl p-5 gap-3">
              <span>
                <Check className="bg-green-100 p-2 rounded-full size-10 text-green-800" />
              </span>
              <div className="grid">
                <span>Days Present</span>
                <span className="font-bold text-xl leading-none">
                  {stats.present}
                </span>
              </div>
            </div>

            <div className="flex items-center border rounded-xl p-5 gap-3">
              <span>
                <X className="bg-red-100 p-2 rounded-full size-10 text-red-800" />
              </span>
              <div className="grid">
                <span>Days Absent</span>
                <span className="font-bold text-xl leading-none">
                  {stats.absent}
                </span>
              </div>
            </div>

            <div className="flex items-center border rounded-xl p-5 gap-3">
              <span>
                <Clock className="bg-amber-100 p-2 rounded-full size-10 text-amber-800" />
              </span>
              <div className="grid">
                <span>Total Days</span>
                <span className="font-bold text-xl leading-none">
                  {stats.total}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="lg:text-lg font-medium text-gray-900">
                Attendance Calendar
              </h3>
              <div className="max-lg:text-sm flex items-center lg:space-x-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ←
                </button>
                <span className="font-medium text-gray-900">
                  {formatMonth(currentMonth)}
                </span>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  →
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const attendanceRecord = getAttendanceForDate(day);

                  return (
                    <div
                      key={index}
                      className="aspect-square"
                    >
                      {day && (
                        <div
                          className={`w-full h-full border-2 rounded-lg p-2 ${
                            attendanceRecord
                              ? getStatusColor(attendanceRecord.status)
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="text-sm font-medium">{day}</div>
                          {!isMobile && (
                            <>
                              {attendanceRecord && (
                                <div className="text-xs mt-1">
                                  <div>{attendanceRecord.checkIn}</div>
                                  {attendanceRecord.checkOut && (
                                    <div>{attendanceRecord.checkOut}</div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmployeeCalendar;
