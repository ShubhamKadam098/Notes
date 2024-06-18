import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationBar = ({
  page,
  setPage,
  length,
}: {
  page: number;
  setPage: (page: number) => void;
  length: number;
}) => {
  return (
    <Pagination className="my-5">
      <PaginationContent className="cursor-pointer">
        <PaginationItem>
          <PaginationPrevious
            className={
              page === 1 ? "pointer-events-none opacity-50" : undefined
            }
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={
              page === Math.ceil(length / 6)
                ? "pointer-events-none opacity-50"
                : undefined
            }
            onClick={() => {
              if (page < Math.ceil(length / 6)) setPage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
