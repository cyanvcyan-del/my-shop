import type { Product } from "@/lib/types";
import ProductCard from "@/src/app/components/layout/ProductCard";

export default function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center gap-2">
        <p className="text-sm md:text-base text-[#111111] font-medium">
          No products found
        </p>
        <p className="text-xs md:text-sm text-[#CCCCCC]">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 w-full">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
}