import data from "@/src/database/db.json";
import ProductCart from "../components/layout/ProductCard";
import Searchbar from "../components/SearchBar"

export default function BestSellers() {
  return (
        <div>
 <Searchbar/>
      
    <div
   
      id="BestSellers"
      className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-4
        mt-11
      "
    >
         
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          justify-items-center
        "
      >
        {data.products.map((product) => (
          <ProductCart
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
      </div>
  );
}