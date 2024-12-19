import GradientBorder from "@/components/GradientBorder";
import React, { useState } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import { UserContext } from "./contexts/UserContextProvider";
import { db, firebaseAuth } from "@/services/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



interface ProfileInfoProps {
    name: string;
    email: string;
    userRole: string;
    cardName: string;
    cardNum: string;
    billAddress: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userRole }) => {

    const authUser = firebaseAuth?.currentUser
    const [user, setUser] = React.useState<any>(null)

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const uploadProfileImage = async (userId: string, file: File) => {
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `users/${userId}/profile.jpg`)
    
            const snapshot = await uploadBytes(storageRef, file)
            console.log("Uploaded file:", snapshot)
    
            const downloadURL = await getDownloadURL(storageRef)
            console.log("File available at:", downloadURL)
    
            const userDocRef = doc(db, "users", userId)
            await updateDoc(userDocRef, { profileImage: downloadURL })
    
            console.log("Profile image URL updated in Firestore.")
        } catch (e) {
            console.error("Error uploading profile image:", e)
        }
    };

    const handleUpload = async () => {
        if (file && authUser) {
            await uploadProfileImage(authUser?.uid, file);
            alert("Profile image uploaded successfully!");
        } else {
            alert("Please select a file first.");
        }
    };

    const fetchUser = async () => {
        if (authUser) {
            const userRef = doc(db, "users", authUser?.uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            setUser(userData)
        }
    }

    React.useEffect(() => {
        fetchUser()
    }, [user]) 

    // React.useEffect(() => {
    //     console.log("user, ", user)
    // }, [user])

    return (
        <AuthContext.Consumer>
            {(authContext) => {
                if (authContext.user !== null)
                    return (
                        <UserContext.Consumer>
                            {(userContext) => {
                                if (userContext != null)
                                    if (userContext.user != null)
                                        return (
                                            <>
                                                <div className="flex items-center pt-[1vw] gap-2">
                                                    <GradientBorder className="flex ml-[7vw] my-[1vw] rounded-full justify-center gradient-animate">
                                                        {user?.profileImage ? (
                                                            <img
                                                            src={user?.profileImage}
                                                            alt="Profile"
                                                            className="rounded-full w-[14vw] max-w-[150px] h-[14vw] max-h-[150px] object-cover"
                                                            />
                                                        ) : (
                                                            <div className="rounded-full bg-gray-50 w-[14vw] max-w-[150px] h-[14vw] max-h-[150px]" />
                                                        )}
                                                    </GradientBorder>

                                                    <div className="flex flex-col gap-[1vh] px-[1vw] ">
                                                        <input type="file" accept="image/*" onChange={handleFileChange} />
                                                        <button onClick={handleUpload} className="px-[1.3vw] py-[1vh] bg-[#F2CC8F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#F2CC8F]">
                                                            Change Profile
                                                            Picture
                                                        </button>
                                                        <button
                                                            onClick={() => {}}
                                                            className="px-[1.3vw] py-[1vh] bg-[#9fa5db] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#9fa5db]"
                                                        >
                                                            Change Password
                                                        </button>
                                                        <button
                                                            onClick={() => {}}
                                                            disabled={
                                                                true
                                                            }
                                                            className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]"
                                                        >
                                                            Change Payment
                                                        </button>
                                                        <button
                                                            onClick={() => {}}
                                                            className="px-[1.3vw] py-[1vh] bg-[#E07A5F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#E07A5F]"
                                                        >
                                                            Delete Account
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[1.5vw] px-2 mb-2 font-semibold bg-[#F2CC8F] bg-opacity-70 rounded-sm">
                                                            Personal
                                                            Information:
                                                        </h1>
                                                        <div className="flex flex-col gap-4 px-6 py-4 w-[53vw] h-[20vh] max-h-[40vh] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                            <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                                {`Name: ${user?.firstName} ${user?.lastName}`}
                                                            </h2>
                                                            <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                                {`Email: ${user?.email}`}
                                                            </h2>
                                                            <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                                {`Role: ${user?.professorDocRef ? 'Professor' : 'Student'}`}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 flex-row justify-center">
                                                    {userRole === "Student" ? (
                                                        <div className="flex flex-col ">
                                                            <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#9fa5db] bg-opacity-70 rounded-sm">
                                                                Interests:{" "}
                                                            </h1>
                                                            <div className="flex flex-col gap-4 px-6 py-4 h-[20vh] max-h-[40vh] w-[32.4vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                                <ul className="list-disc list-inside grid grid-cols-2 gap-x-3 gap-y-[0.5vh]">
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        History
                                                                    </li>
                                                                    <li>
                                                                        Art
                                                                    </li>
                                                                    <li>
                                                                        Philosophy
                                                                    </li>
                                                                    <li>
                                                                        Theatre
                                                                    </li>
                                                                    <li>
                                                                        Mythology
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col">
                                                            <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#F2CC8F] bg-opacity-70 rounded-sm">
                                                                Experience:{" "}
                                                            </h1>
                                                            <div className="flex flex-col gap-4 px-6 py-4 h-[20vh] max-h-[40vh] w-[32vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                                <p>Zilch.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-[1vw]">
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] ml-[6vw] font-semibold bg-[#E07A5F] bg-opacity-70 rounded-sm">
                                                            Current Courses:{" "}
                                                        </h1>
                                                        <div className="flex flex-col gap-4 px-6 py-4 ml-[6vw] h-[20vh] max-h-[40vh] w-[43.5vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                            <ul className="list-disc list-inside grid grid-cols-2 gap-x-3">
                                                                <li>
                                                                    This Is It
                                                                </li>
                                                                <li>
                                                                    If Im Honest
                                                                </li>
                                                                <li>
                                                                    Ethics &
                                                                    Morality in
                                                                    Poetry
                                                                </li>
                                                                <li>
                                                                    Ethics &
                                                                    Morality in
                                                                    Poetry
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#6E739E] bg-opacity-70 rounded-sm">
                                                            Past Courses:{" "}
                                                        </h1>
                                                        <div className="flex flex-col gap-4 px-6 py-4 ] h-[20vh] max-h-[40vh] w-[43.5vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                            <ul
                                                                className="list-disc list-inside grid grid-cols-2 gap-x-3 gap-y-[0.5vh]"
                                                                style={{
                                                                    gridAutoRows:
                                                                        "minmax(auto, 0.5fr)",
                                                                }}
                                                            >
                                                                <li className="justify-center">
                                                                    Women And
                                                                    Why They
                                                                    Matter
                                                                </li>
                                                                <li className="justify-center">
                                                                    10 Things I
                                                                    Hate About
                                                                    You
                                                                </li>
                                                                <li className="justify-center">
                                                                    How To Train
                                                                    Your Dragon
                                                                </li>
                                                                <li className="justify-center">
                                                                    How To Lose
                                                                    A Guy in 10
                                                                    Days
                                                                </li>
                                                                <li className="justify-center">
                                                                    Are You
                                                                    Smarter Than
                                                                    A 5th Grader
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                            }}
                        </UserContext.Consumer>
                    );
            }}
        </AuthContext.Consumer>
    );
};

export default ProfileInfo;
