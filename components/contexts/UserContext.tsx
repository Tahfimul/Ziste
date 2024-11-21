import React, { createContext, useContext } from "react";

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

export interface ExperienceCourse {
    title: string;
    descriptions: string[];
}

export interface Experience {
    institution: string;
    startDate: string;
    endDate: string;
    role: string;
    courses: ExperienceCourse[];
}

interface Professor {
    experience: Experience[];
    courses: string[];
}

export interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    student: Student;
    setStudent: React.Dispatch<React.SetStateAction<Student>>;
    professor: Professor;
    setProfessor: React.Dispatch<React.SetStateAction<Professor>>;
    findUser: (email: string) => void;
    updatePaymentInfo: (
        cardName: string,
        cardNumber: string,
        billAddress: string
    ) => void;
}

// Initialize context with undefined, to be checked in the custom hook
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

// Define the provider component
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        isStudent: true,
    });
    const [student, setStudent] = useState<Student>({ interests: [] });
    const [professor, setProfessor] = useState<Professor>({
        experience: [],
        courses: [],
    });

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                student,
                setStudent,
                professor,
                setProfessor,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
