import ProductCart from "./layout/ProductCard"
import data from "@/src/database/db.json";


export default function BestSellers() {
    return(
      
        <div>
    <h1 className="font-black text-lg md:text-2xl xl:text-[2.5rem] w-[95%] md:w-[95%] mx-auto mt-23">
        Best Sellers
    </h1>
    <div 
    id="BestSellers"
      className="
          flex overflow-x-auto mx-auto gap-4 md:gap-8 lg:gap-12 xl:gap-16 p-4 w-[95%] mt-0.5 md:mt-4 scroll-smooth pb-2
        "
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}>
         {data.products.map((product) => (
          <ProductCart
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
    </div>
              <style>{`
        #grouping::-webkit-scrollbar {
          height: 6px;
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