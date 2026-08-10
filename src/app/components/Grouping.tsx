"use client";

import { useState, useEffect } from "react";
import { fetchMenu, MenuItem } from "@/src/database/dbGrouping";
import GroupingCard from "./layout/GroupingCard";

export default function Grouping() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchMenu()
    .then((data) => {
      setTimeout(() => {
        setItems(data);
        setLoading(false);
      },);
    })
    .catch(() => setLoading(false));
}, []);



  return (
    <div>
      <h1 className="font-black text-lg md:text-2xl xl:text-[2.5rem] w-[95%] md:w-[95%] mx-auto mt-23">
        Grouping
      </h1>

      {/* ✅ یک ردیف با فاصله‌های منظم */}
      <section
        id="grouping"
        className="
          flex overflow-x-auto mx-auto gap-4 md:gap-8 lg:gap-12 xl:gap-16 p-4 w-[95%] mt-0.5 md:mt-4 scroll-smooth pb-2
        "
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0">
           <GroupingCard
  title={item.title}
  icon={item.icon}
  link={item.link}
/>
          </div>
        ))}
      </section>

      {/* استایل اسکرول بار */}
      <style>{`
        #grouping::-webkit-scrollbar {
          height: 4px;
        }
        #grouping::-webkit-scrollbar-track {
          background: transparent;
        }
        #grouping::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        #grouping::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}