"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import RegisterProgress from "../../components/RegisterProgress";
import { UserProvider } from "@/components/contexts/UserContext";

interface LayoutProps {
    children: ReactNode;
}

const RegistrationLayout = ({ children }: LayoutProps) => {
    const pathname = usePathname();

    // Calculate step based on current route
    const step = pathname.includes("/select")
        ? 1
        : pathname.includes("/interests") || pathname.includes("/experience")
        ? 2
        : 3;
    // const [background, setBackground] = React.useState<string>();
    // const updateBackground = (color: string) => {
    //     setBackground(color);
    // };

    return (
        <UserProvider>
            <div className="mt-[10vh] min-h-screen flex flex-col ">
                {/* Progress Bar */}
                <RegisterProgress step={step} />

                {/* Content area for each page */}
                <div className="flex-grow">{children}</div>
            </div>
        </UserProvider>
    );
};

export default RegistrationLayout;
