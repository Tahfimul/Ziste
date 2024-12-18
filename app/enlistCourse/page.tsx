"use client"
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar";
import { db, firebaseAuth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type User = {
    uid:string;
    firstName: string;
    lastName: string;
    email: string;
    isProfessor: boolean;
}
export default function EnlistCourse()
{


    const [courseTitle, setCourseTitle] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [CourseDescription, setCourseDescription] = useState<string>('')
    const [CoursePrice, setCoursePrice] = useState<number>(0)
    const [userInfo, setUserInfo] = useState<User|null>(null)



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                (
                   async ()=>
                    {   
                        const userDocRef = doc(db, `users/${user.uid}`);
                        const userDocSnapshot = await getDoc(userDocRef);
                        if(userDocSnapshot.exists())
                        {
                            setUserInfo({uid: user.uid, 
                                firstName: userDocSnapshot.data().firstName, 
                                lastName:userDocSnapshot.data().lastName,
                                email: userDocSnapshot.data().email,
                                isProfessor: userDocSnapshot.data().professorDocRef !== null})
                        }
                       
                    }
             
                )()
              
            } else {
                    setUserInfo(null)
            }
            
          });
      
          return () => unsubscribe();
    },[])

    const createCourseEnlisting = ()=>
    {
        console.log('course ID: ',uuidv4())
        console.log('course title: ',courseTitle)
        console.log('start date:', startDate)
        //Time is stored according to GMT Timezone
        const sDate = new Date(startDate);
        console.log('timestamp start date: ',sDate.getTime());
        const eDate = new Date(endDate);
        console.log('timestamp end date: ',eDate.getTime());
        // Calculate the difference in seconds
        const differenceInSeconds = eDate.getTime() - sDate.getTime();

        // Calculate weeks
        const weeks = Math.floor(differenceInSeconds / (7 * 24 * 60 * 60))/1000;
        console.log(`cour is ${weeks} weeks long`)

        console.log('Course Description: ',CourseDescription);
        console.log('Course Price: ',CoursePrice);
        console.log('Professor Name: ',`${userInfo?.firstName} ${userInfo?.lastName}`)

    }




    return (
        <>
        { userInfo?.isProfessor &&  

            <>
                <Navbar></Navbar>
                <h1 className="mt-[12vh]">Enlist Course Page</h1>
                <form
                                className="flex flex-col items-center gap-6"
                                onSubmit={(e: React.FormEvent) => {
                                    e.preventDefault();
                                    createCourseEnlisting();
                                }}
                            >

                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="text"
                                    placeholder="CourseTitle"
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    required
                                />
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="date"
                                    placeholder="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />  
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="date"
                                    placeholder="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />                           
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="text"
                                    placeholder="CourseDescription"
                                    value={CourseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    required
                                />
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="number"
                                    placeholder="CoursePrice"
                                    value={CoursePrice}
                                    onChange={(e) => setCoursePrice(e.target.valueAsNumber)}
                                    required
                                />
                                
                                <GradientBorder className="rounded-full gradient-animate">
                                    <button
                                        className="flex px-[2vw] py-[1.5vh] rounded-full items-center bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
                                        type="submit"
                                    >
                                        <span className="text-[1.5vw] text-[#E07A5F] font-semibold">
                                            Enlist Course
                                        </span>
                                    </button>
                                </GradientBorder>

                </form>
            </>

        }
           
        </>
    )
}