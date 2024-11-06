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
        <div className="py-[4vh]">
        <Pagination className="flex justify-center items-center">
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" className="text-[1.7vw]"/>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink href="#" className="text-[1.7vw]">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" className="text-[1.7vw]"/>
            </PaginationItem>
        </PaginationContent>
        </Pagination>
        </div>
        <div className="flex justify-end mr-[3vw] pb-[0vh]">
            <a href="#catalog">
                <button className="flex justify-center items-center w-[18vw] px-4 py-1 rounded-full text-[1.7vw] bg-[#E07A5F] shadow-md transform-transition duration-75 ease-in-out transform hover:scale-105">
                    Go Back to Top
                    <ChevronsUp className="justify-center items-center ml-[0.3vw] h-[4vh] w-[2.4vw] shrink-0 opacity-50" />
                </button>
            </a>
        </div>
        
        </>
    );
}
