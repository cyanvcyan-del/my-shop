export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="size-8 md:size-9 rounded-full flex items-center justify-center
          bg-[#F7F7FC] text-[#111111] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`size-8 md:size-9 rounded-full flex items-center justify-center text-xs md:text-sm transition-colors
            ${
              page === currentPage
                ? "bg-[#111111] text-white"
                : "bg-[#F7F7FC] text-[#111111] hover:bg-[#EFF2F5]"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="size-8 md:size-9 rounded-full flex items-center justify-center
          bg-[#F7F7FC] text-[#111111] text-sm disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </div>
  );
}