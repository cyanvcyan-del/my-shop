export default function ProductCard({ image, title, price }) {
  return (
    <div className=" group w-37 h-55 sm:w-37 sm:h-55 md:w-56 md:h-71 bg-mainT shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:bg-gray-200 hover:scale-105 duration-300 rounded-br-[40px] rounded-bl-[40px] rounded-tl-[104px] rounded-tr-[104px] p-2.5 ">

      <div className="w-32 h-21 relative sm:w-32 sm:h-21 md:w-48 md:h-32 bg-mainS   rounded-br-[16px] rounded-bl-[16px] rounded-tl-[104px] rounded-tr-[104px] mt-0.5 mx-auto max-sm:mt-1 md:mt-1">
        <img
          src={`/${image}`}
          alt={title}
          className="w-100 mx-auto -translate-y-7 md:-translate-y-12"
        />
      </div>

      <div>
      
        <div className="h-12 md:h-14">
          <p className="ml-1.5 md:ml-2.5 lg:ml-2.5 mt-1.5 font-black text-base lg:text-xl tracking-[2%]">
            {title}
          </p>
        </div>

      
        <p className="text-sm ml-1 mt-1">
          ⭐⭐⭐⭐⭐
        </p>

       
        <button className="w-16 h-6 md:w-18 md:h-8 bg-mainblack rounded-2xl text-white text-xs md:text-sm font-medium ml-1 mt-2 md:mt-3">
          {price}
        </button>
      </div>

    </div>
  );
}