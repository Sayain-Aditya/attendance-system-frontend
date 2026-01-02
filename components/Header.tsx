"use client";

import { useDateTime } from "@/hooks/useDateTime";
import React from "react";

const Header = ({ text }: { text?: string }) => {
  const { date, time } = useDateTime();

  return (
    <div className="flex items-end justify-between w-full border p-5 pt-7 rounded-xl sticky top-2 bg-[#008B93] text-white">
      <div>
        <h1 className="font-bold text-3xl leading-none">
          {text ?? "Welcome, Admin"}
        </h1>
        <span className="font-medium text-white/70">{date}</span>
      </div>
      <div className="grid text-right">
        <span className="uppercase text-xl font-semibold leading-none">
          {time}
        </span>
        <span className="font-medium text-white/70 text-sm">
          Live Time (IST)
        </span>
      </div>
    </div>
  );
};

export default Header;
