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
        <>
        <Pagination className="flex justify-center items-center">
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
        <div className="flex justify-end mr-4 pb-20">
            <a href="#catalog">
                <button className="flex w-[172px] px-3 py-1 pr-0 rounded-full text-md bg-[#E07A5F]">
                    Go Back to Top
                    <ChevronsUp className="mx-1 h-6 w-6 shrink-0 opacity-50" />
                </button>
            </a>
        </div>
        
        </>
    );
}
