import { allProducts } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import ProductsGrid from "@/src/app/components/products-grid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q, allProducts);

  return (
    <main className="min-h-screen bg-[#F0F2F6] px-[4%] py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-lg md:text-2xl font-semibold text-[#111111]">
          Search results for "{q}"
        </h1>
        <p className="text-xs md:text-sm text-[#CCCCCC] mt-1">
          {results.length} products found
        </p>
      </div>

      <ProductsGrid products={results} />
    </main>
  );
}