"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import RegisterProgress from "../../components/RegisterProgress";
import { UserContextProvider } from "@/components/contexts/UserContextProvider";

interface LayoutProps {
    children: ReactNode;
}

const ProfessorLayout = ({ children }: LayoutProps) => {
    return (
        <UserContextProvider>
            <div>
                {/* Content area for each page */}
                <div className="flex-grow">{children}</div>
            </div>
        </UserContextProvider>
    );
};

export default ProfessorLayout;