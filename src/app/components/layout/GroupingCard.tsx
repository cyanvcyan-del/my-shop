import { ReactNode } from "react";

interface GroupingCardProps {
  title: string;
  icon: ReactNode;
}

export default function GroupingCard({ title, icon }: GroupingCardProps) {
  return (
    <section className="group mx-auto bg-mainT w-25 h-25 max-sm:w-28 shadow-[0_10px_30px_rgba(0,0,0,0.03)] max-sm:h-27 md:w-35 md:h-35 max-md:w-35 max-md:h-35 xl:w-45 xl:h-45 rounded-[40px] grid place-items-center transition-colors duration-400 hover:bg-[#111] active:bg-[#111] cursor-pointer">
      <div className="flex flex-col items-center justify-center gap-0.9">
        <div className="transition-colors duration-400 group-hover:text-white group-active:text-white">
          {icon}
        </div>
        <span className="text-xs max-sm:text-sm md:text-base font-extrabold text-center transition-colors group-hover:text-white group-active:text-white">
          {title}
        </span>
      </div>
    </section>
  );
}