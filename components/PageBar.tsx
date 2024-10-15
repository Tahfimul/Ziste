import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import {ChevronsUp } from "lucide-react";


export const PageBar = () => {
    return (
        <div className="flex justify-between items-center py-3 mb-20">
        <Pagination className="flex justify-center flex-grow">
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" />
            </PaginationItem>
        </PaginationContent>
        </Pagination>

            <a href="#catalogTop">
                <button className="flex w-44 px-3 py-1 mr-20 rounded-full text-md bg-[#E07A5F]">
                    Go Back to Top
                    <ChevronsUp className="mx-1 h-6 w-6 shrink-0 opacity-50" />
                </button>
            </a>
        </div>
    );
}
