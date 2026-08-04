export default function Heroo() {
  return (
    <div
      className="flex flex-col lg:flex-row w-[95%]  md:w-[95%]
           mx-auto mt-4 md:mt-7 p-6 md:p-10 rounded-[40px] bg-[#F8F9FA] shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative"
    >
      {/* Badge 20% OFF */}
      <div className="absolute top-6 right-6 md:top-10 md:right-8 text-right font-extrabold text-[#1a1a1a] text-2xl md:text-[2.5rem] leading-none tracking-tighter">
        20%
        <br />
        OFF
      </div>

      {/* Left Section: Text Content */}
      <div className="flex flex-col justify-center items-start flex-1 gap-3 md:gap-4 pl-0 lg:pl-6 py-8 lg:py-0 z-10">
        <h1 className="text-[2.8rem] md:text-[4rem] lg:text-[4.5rem] font-black text-[#1a1a1a]  top-6  md:top-10 ">
          Japanese beef
        </h1>

        {/* Stars */}
        <div className="flex gap-1 text-[1.6rem] md:text-[1.8rem] tracking-wide mt-1">
          <span className="text-[#1a1a1a]">★</span>
          <span className="text-[#1a1a1a]">★</span>
          <span className="text-[#1a1a1a]">★</span>
          <span className="text-[#1a1a1a]">★</span>
          <span className="text-[#D1D1D6]">★</span>
        </div>

        <p className="text-[#8E8E93] max-w-[24rem] text-[0.9rem] md:text-[1rem] leading-7 mt-2">
          Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>

        {/* Buttons Row */}
        <div className="flex items-center gap-4 mt-4 md:mt-6">
          <button className="px-6 py-3 bg-[#F1F1F5] rounded-full text-[#1a1a1a] font-bold text-sm tracking-wide shadow-sm">
            $14.99
          </button>
          <button className="px-8 py-3 bg-[#1a1a1a] text-white rounded-full font-bold text-sm tracking-wide hover:bg-black transition-colors shadow-md">
            buy
          </button>
        </div>
      </div>

      {/* Right Section: Image & Carousel Controls */}
      <div className="flex-1 flex justify-center lg:justify-end relative mt-6 lg:mt-0">
        {/* Image Wrapper with Black Bowl Rim Effect */}
        <div className="relative w-[90%] md:w-[100%] max-w-[28rem] lg:max-w-[32rem] lg:-ml-10 bg-[#e5e5e5] rounded-full border-[8px] border-[#1a1a1a] shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden aspect-square">
          <img
            src="japanese-beef-donburi-bowl-with-rice-scallions.webp"
            alt="Japanese beef"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-2 right-0 md:bottom-4 md:right-2 flex gap-2">
          <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] text-[#1a1a1a] font-bold text-sm transition hover:scale-105">
            {"<"}
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] text-[#1a1a1a] font-bold text-sm transition hover:scale-105">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
