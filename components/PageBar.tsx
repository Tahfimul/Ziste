//Source: ChatGPT
// Shadcdn Component (PageBar)
import React, { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsUp } from "lucide-react";

export const PageBar = ({ totalItems, onPageChange }: { totalItems: number, onPageChange: (page: number) => void }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    onPageChange(currentPage); // Fetch courses when the page changes
  }, [currentPage, onPageChange]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="py-[4vh]">
        <Pagination className="flex justify-center items-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="text-[1.7vw]"
                onClick={handlePrevious}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  className={`text-[1.7vw] ${currentPage === i + 1 ? "font-bold bg-[#B5B2B2] hover:bg-[#B5B2B2]" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                className="text-[1.7vw]"
                onClick={handleNext}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      <div className="flex justify-end mr-[3vw] pb-[0vh]">
        <a href="#catalog">
          <button className="flex justify-center items-center w-[18vw] px-4 py-1 rounded-full text-[1.7vw] bg-[#E07A5F] shadow-md transform transition duration-75 ease-in-out hover:scale-105">
            Go Back to Top
            <ChevronsUp className="justify-center items-center ml-[0.3vw] h-[4vh] w-[2.4vw] shrink-0 opacity-50" />
          </button>
        </a>
      </div>
    </>
  );
};