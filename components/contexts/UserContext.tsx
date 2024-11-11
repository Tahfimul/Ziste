import React, { createContext, useContext} from "react";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    isStudent: boolean;
    cardName: string;
    cardNum: string;
    billAddress: string;
}

export interface Student {
    interests: string[];
}

export interface Professor {
    courses: string[];
}

export interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    student: Student;
    setStudent: React.Dispatch<React.SetStateAction<Student>>;
    professor: Professor;
    setProfessor: React.Dispatch<React.SetStateAction<Professor>>;
    findUser: (email:string)=>void;
    updatePaymentInfo: (cardName: string, cardNumber: string, billAddress: string)=>void;
}

// Initialize context with undefined, to be checked in the custom hook
export const UserContext = createContext<UserContextType | undefined>(undefined);



export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
