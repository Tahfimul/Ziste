import { ReactNode, useState } from "react";
import {User, Student, Professor, UserContext} from '@/components/contexts/UserContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
// Define the provider component
interface UserProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        isStudent: true,
    });
    const [student, setStudent] = useState<Student>({ interests: [] });
    const [professor, setProfessor] = useState<Professor>({ courses: [] });

    const findUser = async (email:string)=>
    {
        const existingUsers = await getDocs(collection(db, 'users'));
        existingUsers.forEach((user_)=>{
            
        if(user_.data().email === email)
        {
            console.log('email:')
            console.log(user_.data().email)
            if(user_.data().isStudent || user_.data().isStudent === undefined)
                setUser({
                    email:user_.data().email as string,
                    firstName: user_.data().firstName as string,
                    lastName: user_.data().lastName as string,
                    birthday: user_.data().birthday as string,
                    isStudent: true
                })
            else
                setUser({
                    email:user_.data().email as string,
                    firstName: user_.data().firstName as string,
                    lastName: user_.data().lastName as string,
                    birthday: user_.data().birthday as string,
                    isStudent: false
                })
        }
            

        })
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
                findUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};