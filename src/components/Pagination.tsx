import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount?: number;
  pageSize?: number;
}

export default function Pagination({ page, totalPages, onPageChange, totalCount, pageSize = 20 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    const delta = 2;

    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount || 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      {/* Count */}
      {totalCount !== undefined && (
        <p className="text-sm text-gray-500">
          显示第 <span className="font-semibold text-gray-700">{startItem}–{endItem}</span> 条，
          共 <span className="font-semibold text-gray-700">{totalCount.toLocaleString()}</span> 张卡牌
        </p>
      )}

      {/* Page buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((p, i) => (
          p === '...'
            ? <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">···</span>
            : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                  p === page
                    ? 'bg-red-500 text-white shadow-md shadow-red-200'
                    : 'border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {p}
              </button>
            )
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
