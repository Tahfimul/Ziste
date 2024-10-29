import GradientBorder from "@/components/GradientBorder";

interface ProfileInfoProps {
    name: string;
    email: string;
    userRole: string;
    cardName: string;
    cardNum: string;
    billAddress: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, email, userRole, cardName, cardNum, billAddress }) => (
    <>
            <div className="flex items-center pt-[1vw] gap-2">
                <GradientBorder className="flex ml-[7vw] my-[1vw] rounded-full justify-center gradient-animate">
                    <div className="rounded-full bg-gray-50 w-[14vw] h-[14vw]"></div>
                </GradientBorder>
                <div className="flex flex-col gap-[1vh] px-[1vw] ">
                    <button className="px-[1.3vw] py-[1vh] bg-[#F2CC8F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#F2CC8F]">Change Profile Picture</button>
                    <button className="px-[1.3vw] py-[1vh] bg-[#9fa5db] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#9fa5db]">Change Password</button>
                    <button className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]">Change Payment</button>
                    <button className="px-[1.3vw] py-[1vh] bg-[#E07A5F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#E07A5F]">Delete Account</button>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[1.5vw] px-2 mb-2 font-semibold bg-[#F2CC8F] bg-opacity-70 rounded-sm">Personal Information:</h1>
                    <div className="flex flex-col gap-4 px-6 py-4 w-[53vw] h-[20vh] max-h-[40vh] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Name: {name}</h2>
                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Email: {email}</h2>
                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Role: {userRole}</h2>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col">
                    <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#81B29A] bg-opacity-70 ml-[6vw] rounded-sm">Payment Information:</h1>
                    <div className="flex flex-col gap-4 px-6 py-4 ml-[6vw] h-[20vh] max-h-[40vh] w-[55vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                        {userRole === "Student" ? (
                            <>
                            <h2>Name on Card: {cardName}</h2>
                            <h2>Card Number: {cardNum}</h2>
                            <h2>Billing Address: {billAddress}</h2>
                            </>
                        ) : (
                            <>
                            <h2>Name on Account: </h2>
                            <h2>Bank: </h2>
                            <h2>Routing Number: </h2>
                            </>
                        )}
                    </div>
                </div>
                {userRole === "Student" ? (
                    <div className="flex flex-col">
                        <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#9fa5db] bg-opacity-70 rounded-sm">Interests: </h1>
                        <div className="flex flex-col gap-4 px-6 py-4 h-[20vh] max-h-[40vh] w-[32.4vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                            <ul className="list-disc list-inside grid grid-cols-2 gap-x-3 gap-y-[0.5vh]">
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                                <li>Anthropology</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#F2CC8F] bg-opacity-70 rounded-sm">Experience: </h1>
                        <div className="flex flex-col gap-4 px-6 py-4 h-[20vh] max-h-[40vh] w-[32vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                            <p>Zilch.</p>
                        </div>
                    </div>
                )}
            </div>         
            <div className="flex gap-[1vw]">
                <div className="flex flex-col">
                    <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] ml-[6vw] font-semibold bg-[#E07A5F] bg-opacity-70 rounded-sm">Current Courses: </h1>
                    <div className="flex flex-col gap-4 px-6 py-4 ml-[6vw] h-[20vh] max-h-[40vh] w-[43.5vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                        <ul className="list-disc list-inside grid grid-cols-2 gap-x-3">
                            <li>This Is It</li>
                            <li>If Im Honest</li>
                            <li>Ethics & Morality in Poetry</li>
                            <li>Ethics & Morality in Poetry</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#6E739E] bg-opacity-70 rounded-sm">Past Courses: </h1>
                    <div className="flex flex-col gap-4 px-6 py-4 ] h-[20vh] max-h-[40vh] w-[43.5vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                        <ul className="list-disc list-inside grid grid-cols-2 gap-x-3 gap-y-[0.5vh]" style={{ gridAutoRows: 'minmax(auto, 0.5fr)' }}>
                            <li className="justify-center">Women And Why They Matter</li>
                            <li className="justify-center">10 Things I Hate About You</li>
                            <li className="justify-center">How To Train Your Dragon</li>
                            <li className="justify-center">How To Lose A Guy in 10 Days</li>
                            <li className="justify-center">Are You Smarter Than A 5th Grader</li>
                        </ul>
                    </div>
                </div>
            </div>
                            
                            
                            
                           
    </>
);

export default ProfileInfo;