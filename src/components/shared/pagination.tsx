import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-brown transition-all duration-300 hover:bg-olive hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={t('pagination.previous')}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            page === currentPage
              ? "bg-forest border-2 border-white/20 text-white shadow-sm"
              : "bg-cream text-brown hover:bg-olive hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-brown transition-all duration-300 hover:bg-olive hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={t('pagination.next')}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
