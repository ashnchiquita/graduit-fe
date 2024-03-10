import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PageNavigationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  setCurrentPage: (pageIndex: number) => void;
  totalPages: number;
}

const PageNavigation = ({
  currentPage,
  totalPages,
  setCurrentPage,
  ...props
}: PageNavigationProps) => {
  const [pageContent, setPageContent] = useState<number[]>([]);

  useEffect(() => {
    const newPageContent = [];

    if (currentPage > 2) newPageContent.push(0);
    if (currentPage > 1) newPageContent.push(currentPage - 1);
    newPageContent.push(currentPage);
    if (currentPage < totalPages) newPageContent.push(currentPage + 1);
    if (currentPage < totalPages - 1) newPageContent.push(0);

    setPageContent(newPageContent);
  }, [currentPage, totalPages]);

  return (
    <Pagination {...props}>
      <PaginationContent className="gap-0">
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer select-none"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        {pageContent.map((item) => {
          switch (item) {
            case 0:
              return (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            default:
              return (
                <PaginationItem>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item);
                    }}
                    isActive={item === currentPage}
                    size="sm"
                    className="cursor-pointer select-none"
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
          }
        })}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer select-none"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageNavigation;
