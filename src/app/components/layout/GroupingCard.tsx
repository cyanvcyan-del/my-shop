import MainDish from "../svg/Main-dish";

export default function GroupingCard() {
  return (
    <section className="bg-mainT w-28 h-28 max-sm:w-28 max-sm:h-28 md:w-36 md:h-36 rounded-[40px] grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-0.5">
        <MainDish className="w-[50%] h-[50%]" />
        <span className="text-xs max-sm:text-sm md:text-base font-extrabold text-center">
          Main Dish
        </span>
      </div>
    </section>
  );
}