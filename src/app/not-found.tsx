
export default function NotFound() {
  return (
    
    <div className="min-h-screen bg-mainP-500 flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center gap-2">
        {/* Top label */}
        <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium text-black">
          OOPS! PAGE NOT FOUND
        </p>

        {/* 404 */}
        <h1
          className="
            font-black text-black leading-none select-none
            text-[7rem] sm:text-[10rem] md:text-[14rem] lg:text-[16rem]
          "
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          404
        </h1>

        {/* Bottom label */}
        <p
          className="
            text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-black
            max-w-[260px] sm:max-w-xs leading-relaxed mt-1
          "
        >
          WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </p>
      </div>
    </div>
  );
}