
import GradientBorder from "@/components/GradientBorder";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { UserContext } from "./contexts/UserContext";

interface ProfileInfoProps {
    name: string;
    email: string;
    userRole: string;
    cardName: string;
    cardNum: string;
    billAddress: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, userRole}) => {

    const [name_, setName] = useState<string|undefined>(undefined)
    const [editPayment, setEditPayment] = useState<boolean>(false)
    const [cardName, setCardName] = useState<string>('') 
    const [cardNumber, setCardNumber] = useState<string>('')
    const [billAddress, setBillingAddress] = useState<string>('')
     const userContext = useContext(UserContext);
     const authContext = useContext(AuthContext);
     useEffect(()=>{


        const fetchUser = () =>
        {
            userContext?.findUser(authContext.user?.email as string)
            
        }
        
        if(userContext!==null)
        {   
            console.log('user:')
            console.log(userContext?.user)
            if(name_ === undefined)
                fetchUser() 

            if(userContext?.user?.firstName)
                setName('name')

        }
            
            
        

    },[userContext]) 

 return(
    <AuthContext.Consumer>
        {

             (authContext) =>{
                if (authContext.user !== null)
                return(
                    <UserContext.Consumer>
                        {userContext=>{
                             

                          if(userContext!=null)
                            if(userContext.user!=null)
                                return(
                                <>
                                <div className="flex items-center pt-[1vw] gap-2">
                                <GradientBorder className="flex ml-[7vw] my-[1vw] rounded-full justify-center gradient-animate">
                                    <div className="rounded-full bg-gray-50 w-[14vw] h-[14vw]">
                                        
                                    </div>
                                </GradientBorder>
                                
                                <div className="flex flex-col gap-[1vh] px-[1vw] ">
                                    <button className="px-[1.3vw] py-[1vh] bg-[#F2CC8F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#F2CC8F]">Change Profile Picture</button>
                                    <button className="px-[1.3vw] py-[1vh] bg-[#9fa5db] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#9fa5db]">Change Password</button>
                                    <button onClick={()=>{setCardName(userContext.user.cardName); setCardNumber(userContext.user.cardNum); setBillingAddress(userContext.user.billAddress); setEditPayment(true);}} disabled={editPayment} className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]">Change Payment</button>
                                    <button className="px-[1.3vw] py-[1vh] bg-[#E07A5F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#E07A5F]">Delete Account</button>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[1.5vw] px-2 mb-2 font-semibold bg-[#F2CC8F] bg-opacity-70 rounded-sm">Personal Information:</h1>
                                    <div className="flex flex-col gap-4 px-6 py-4 w-[53vw] h-[20vh] max-h-[40vh] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Name: {`${userContext.user.firstName} ${userContext.user.lastName}`}</h2>
                                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Email: {userContext.user.email}</h2>
                                        <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">Role: {userContext.user.isStudent?'Student':'Professor'}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#81B29A] bg-opacity-70 ml-[6vw] rounded-sm">Payment Information:</h1>
                                    <div className="flex flex-col gap-4 px-6 py-4 ml-[6vw] h-[25vh] max-h-[40vh] w-[50vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                        {(()=>{
                                            
                                            if(userRole === "Student") 
                                                if(editPayment)
                                                    return(
                                                        <div className="space-y-4">
                                                            <div className="flex items-center">
                                                                <label htmlFor="cardName" className="text-sm mr-2">Name on Card:</label>
                                                                <input 
                                                                id="cardName" 
                                                                type="text" 
                                                                value={cardName}
                                                                onChange={(e)=>{setCardName(e.target.value)}}
                                                                className="px-2 py-1 border rounded-sm"
                                                                placeholder="Enter your name on Card"
                                                                />
                                                            </div>
                                                            
                                                            <div className="flex items-center">
                                                                <label htmlFor="cardNumber" className="text-sm mr-2">Card Number:</label>
                                                                <input 
                                                                id="cardNumber" 
                                                                type="cardNumber" 
                                                                value={cardNumber}
                                                                onChange={(e)=>{setCardNumber(e.target.value)}}
                                                                className="px-2 py-1 border rounded-sm"
                                                                placeholder="Enter your Card Number"
                                                                />
                                                            </div>

                                                            <div className="flex items-center">
                                                                <label htmlFor="billingAddress" className="text-sm mr-2">Billing Address:</label>
                                                                <input 
                                                                id="billingAddress" 
                                                                type="billingAddress" 
                                                                value={billAddress}
                                                                onChange={(e)=>{setBillingAddress(e.target.value)}}
                                                                className="px-2 py-1 border rounded-sm"
                                                                placeholder="Enter your billing address"
                                                                />
                                                            </div>

                                                            <div className="flex items-center">
                                                                <button className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]" onClick={()=>{userContext.updatePaymentInfo(cardName, cardNumber, billAddress); setEditPayment(false);}}>submit</button>
                                                            </div>
                                                        </div>
                                                    ) 
                                                else
                                                    return(
                                                        <>
                                                        <h2>Name on Card: {userContext.user.cardName}</h2>
                                                        <h2>Card Number: {userContext.user.cardNum}</h2>
                                                        <h2>Billing Address: {userContext.user.billAddress}</h2>
                                                        </>
                                                    ) 
                                            else 
                                                if (editPayment)
                                                    return(<></>)
                                                else
                                                    return(
                                                        <>
                                                        <h2>Name on Account: {name}</h2>
                                                        <h2>Bank: </h2>
                                                        <h2>Routing Number: </h2>
                                                        </>
                                                    )
                                        })()}
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
                            )    
                        }
                    }
                        
                    </UserContext.Consumer>)
            }
        }                  
                           
    </AuthContext.Consumer>
);
}

export default ProfileInfo;