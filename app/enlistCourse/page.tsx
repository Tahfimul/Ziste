"use client"
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar";
import { db, firebaseAuth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
    const [SchoolName, setSchoolName] = useState<string>('')
    const [Subject, setSubject] = useState<string>('')

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
        const courseID = uuidv4()
        const courseDocRef = doc(db, `courses/${courseID}`);
        //Time is stored according to GMT Timezone
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        // Calculate the difference in seconds
        const differenceInSeconds = eDate.getTime() - sDate.getTime();

        // Calculate weeks
        const weeks = Math.floor(differenceInSeconds / (7 * 24 * 60 * 60))/1000;

        (async ()=>
            {
                
                await setDoc(courseDocRef, {
                    courseID:courseID,
                    courseTitle: courseTitle,
                    date: startDate,
                    description: CourseDescription,
                    length: weeks,
                    materials: "None",
                    price: CoursePrice,
                    professorName: `${userInfo?.firstName} ${userInfo?.lastName}`,
                    schoolName: SchoolName,
                    subject: Subject,                   
                });

                const accessControlsCollectionName = "access_controls";
                const can_add_channel_users_documentID = "can_add_channel_users";
                const can_delete_posts_users_documentID = "can_delete_posts_users";
                const can_post_users_documentID = "can_post_users";
                const can_remove_channel_users_documentID = "can_remove_channel_users";
                const can_remove_users_users_documentID = "can_remove_users_users";
                const can_add_channel_users_data = {
                    [userInfo?.email as string]: true,
                };
                const can_delete_posts_users_data = {
                    [userInfo?.email as string]: true,
                };
                const can_post_users_data = {
                    [userInfo?.email as string]: true,
                };
                const can_remove_channel_users_data = {
                    [userInfo?.email as string]: true,
                };
                const can_remove_users_users_data = {
                    [userInfo?.email as string]: true,
                };

                const can_add_channel_users_docRef = doc(db, `courses/${courseID}/${accessControlsCollectionName}`, can_add_channel_users_documentID);

                await setDoc(can_add_channel_users_docRef, can_add_channel_users_data);

                const can_delete_posts_users_docRef = doc(db, `courses/${courseID}/${accessControlsCollectionName}`, can_delete_posts_users_documentID);

                await setDoc(can_delete_posts_users_docRef, can_delete_posts_users_data);

                const can_post_users_docRef = doc(db, `courses/${courseID}/${accessControlsCollectionName}`, can_post_users_documentID);

                await setDoc(can_post_users_docRef, can_post_users_data);

                const can_remove_channel_users_docRef = doc(db, `courses/${courseID}/${accessControlsCollectionName}`, can_remove_channel_users_documentID);

                await setDoc(can_remove_channel_users_docRef, can_remove_channel_users_data);

                const can_remove_users_users_docRef = doc(db, `courses/${courseID}/${accessControlsCollectionName}`, can_remove_users_users_documentID);

                await setDoc(can_remove_users_users_docRef, can_remove_users_users_data);

                const channnelsCollectionName = "channels";

                const channelsDocumentID = "info";

                const channels = {channels:['general']};

                const channels_docRef = doc(db, `courses/${courseID}/${channnelsCollectionName}`, channelsDocumentID);

                await setDoc(channels_docRef, channels);

                const generalChannelCollectionName = "general";

                const generalChannelDocumentID = new Date().getTime()

                const generalChannelDocumentID_data = {
                    text: "Welcome to #general channel",
                    timestamp: generalChannelDocumentID,
                    user: userInfo?.email
                }

                const general_channel_docRef = doc(db, `courses/${courseID}/${channnelsCollectionName}/${channelsDocumentID}/${generalChannelCollectionName}/${generalChannelDocumentID}`);
                await setDoc(general_channel_docRef, generalChannelDocumentID_data);

                const conversationsCollectionName = "conversations";

                const conversationsDocumentID = userInfo?.uid;

                const conversationsData = {conversations: [userInfo?.email]}

                const conversations_docRef = doc(db, `courses/${courseID}/${conversationsCollectionName}/${conversationsDocumentID}`);

                await setDoc(conversations_docRef, conversationsData);

                const currConversationCollectionName = userInfo?.email;

                const currConversationDocumentID = new Date().getTime();

                const currConversationData = {
                    timestamp: currConversationDocumentID,
                    text: 'Note to self',
                    user: userInfo?.email
                }

                const currConversation_docRef = doc(db, `courses/${courseID}/${conversationsCollectionName}/${conversationsDocumentID}/${currConversationCollectionName}/${currConversationDocumentID}`);
                await setDoc(currConversation_docRef, currConversationData);

                const particiapantsCollectionName = "participants";
                const participantsDocumentID = userInfo?.uid;
                const participants_data = {}
                
                const participants_docRef = doc(db, `courses/${courseID}/${particiapantsCollectionName}/${participantsDocumentID}`)
                await setDoc(participants_docRef, participants_data);
            }
        )()
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
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="text"
                                    placeholder="SchoolName"
                                    value={SchoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    required
                                />
                                <input
                                    className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                    type="text"
                                    placeholder="Subject"
                                    value={Subject}
                                    onChange={(e) => setSubject(e.target.value)}
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