import React, { createContext, useContext, ReactNode, useState } from "react";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
// Define the provider component
interface UserProviderProps {
    children: ReactNode;
}

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

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        isStudent: true,
        cardName: "",
        cardNum: "",
        billAddress: "",
    });
    const [student, setStudent] = useState<Student>({ interests: [] });
    const [professor, setProfessor] = useState<Professor>({
        experience: [],
        courses: [],
    });

    const findUser = async (email: string) => {
        const existingUsers = await getDocs(collection(db, "users"));
        existingUsers.forEach(async (user_) => {
            if (user_.data().email === email) {
                console.log("id:");
                console.log(user_.id);
                console.log("email:");
                console.log(user_.data().email);
                if (
                    user_.data().isStudent ||
                    user_.data().isStudent === undefined
                )
                    if (user_.data().cardName)
                        setUser({
                            email: user_.data().email as string,
                            firstName: user_.data().firstName as string,
                            lastName: user_.data().lastName as string,
                            birthday: user_.data().birthday as string,
                            isStudent: true,
                            cardName: user_.data().cardName as string,
                            cardNum: user_.data().cardNum as string,
                            billAddress: user_.data().billAddress as string,
                        });
                    else
                        setUser({
                            email: user_.data().email as string,
                            firstName: user_.data().firstName as string,
                            lastName: user_.data().lastName as string,
                            birthday: user_.data().birthday as string,
                            isStudent: true,
                            cardName: "",
                            cardNum: "",
                            billAddress: "",
                        });
                else if (user_.data().cardName)
                    setUser({
                        email: user_.data().email as string,
                        firstName: user_.data().firstName as string,
                        lastName: user_.data().lastName as string,
                        birthday: user_.data().birthday as string,
                        isStudent: false,
                        cardName: user_.data().cardName as string,
                        cardNum: user_.data().cardNum as string,
                        billAddress: user_.data().billAddress as string,
                    });
                else
                    setUser({
                        email: user_.data().email as string,
                        firstName: user_.data().firstName as string,
                        lastName: user_.data().lastName as string,
                        birthday: user_.data().birthday as string,
                        isStudent: false,
                        cardName: "",
                        cardNum: "",
                        billAddress: "",
                    });
            }
        });
    };

    const updatePaymentInfo = async (
        cardName: string,
        cardNumber: string,
        billAddress: string
    ) => {
        setUser({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            isStudent: user.isStudent,
            cardName: cardName,
            cardNum: cardNumber,
            billAddress: billAddress,
        });

        const existingUsers = await getDocs(collection(db, "users"));
        existingUsers.forEach(async (user_) => {
            if (user_.data().email === user.email) {
                await setDoc(user_.ref, {
                    birthday: user_.data().birthday,
                    createdAt: user_.data().createdAt,
                    email: user_.data().email,
                    firstName: user_.data().firstName,
                    lastName: user_.data().lastName,
                    professorDocRef: user_.data().professorDocRef,
                    studentRef: user_.data().studentRef,
                    cardName: cardName,
                    cardNum: cardNumber,
                    billAddress: billAddress,
                });
            }
        });
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                student,
                setStudent,
                professor,
                setProfessor,
                findUser,
                updatePaymentInfo,
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
