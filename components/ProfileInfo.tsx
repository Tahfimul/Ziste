import GradientBorder from "@/components/GradientBorder";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import { UserContext } from "./contexts/UserContextProvider";

interface ProfileInfoProps {
    name: string;
    email: string;
    userRole: string;
    cardName: string;
    cardNum: string;
    billAddress: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, userRole }) => {
    const [name_, setName] = useState<string | undefined>(undefined);
    const [editPayment, setEditPayment] = useState<boolean>(false);
    const [cardName, setCardName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [billAddress, setBillingAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] =
        useState<boolean>(false);
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = () => {
            userContext?.findUser(authContext.user?.email as string);
        };

        if (userContext !== null) {
            console.log("user:");
            console.log(userContext?.user);
            if (name_ === undefined) fetchUser();

            if (userContext?.user?.firstName) setName("name");
        }
    }, [userContext]);

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
                                                        <div className="rounded-full bg-gray-50 w-[14vw] h-[14vw]"></div>
                                                    </GradientBorder>

                                                    <div className="flex flex-col gap-[1vh] px-[1vw] ">
                                                        <button className="px-[1.3vw] py-[1vh] bg-[#F2CC8F] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#F2CC8F]">
                                                            Change Profile
                                                            Picture
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setShowPasswordModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="px-[1.3vw] py-[1vh] bg-[#9fa5db] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#9fa5db]"
                                                        >
                                                            Change Password
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCardName(
                                                                    userContext
                                                                        .user
                                                                        .cardName
                                                                );
                                                                setCardNumber(
                                                                    userContext
                                                                        .user
                                                                        .cardNum
                                                                );
                                                                setBillingAddress(
                                                                    userContext
                                                                        .user
                                                                        .billAddress
                                                                );
                                                                setEditPayment(
                                                                    true
                                                                );
                                                            }}
                                                            disabled={
                                                                editPayment
                                                            }
                                                            className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]"
                                                        >
                                                            Change Payment
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setShowDeleteAccountModal(
                                                                    true
                                                                );
                                                            }}
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
                                                                Name:{" "}
                                                                {`${userContext.user.firstName} ${userContext.user.lastName}`}
                                                            </h2>
                                                            <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                                Email:{" "}
                                                                {
                                                                    userContext
                                                                        .user
                                                                        .email
                                                                }
                                                            </h2>
                                                            <h2 className="flex overflow-hidden whitespace-nowrap text-ellipsis">
                                                                Role:{" "}
                                                                {userContext
                                                                    .user
                                                                    .isStudent
                                                                    ? "Student"
                                                                    : "Professor"}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#81B29A] bg-opacity-70 ml-[6vw] rounded-sm">
                                                            Payment Information:
                                                        </h1>
                                                        <div className="flex flex-col gap-4 px-6 py-4 ml-[6vw] h-[25vh] max-h-[40vh] w-[50vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                            {(() => {
                                                                if (
                                                                    showDeleteAccountModal
                                                                )
                                                                    return (
                                                                        <div
                                                                            className="relative z-10"
                                                                            aria-labelledby="modal-title"
                                                                            role="dialog"
                                                                            aria-modal="true"
                                                                        >
                                                                            <div
                                                                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                                                                aria-hidden="true"
                                                                            ></div>

                                                                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                            <div className="sm:flex sm:items-start">
                                                                                                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                                                    <svg
                                                                                                        className="h-6 w-6 text-red-600"
                                                                                                        fill="none"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        stroke-width="1.5"
                                                                                                        stroke="currentColor"
                                                                                                        aria-hidden="true"
                                                                                                        data-slot="icon"
                                                                                                    >
                                                                                                        <path
                                                                                                            stroke-linecap="round"
                                                                                                            stroke-linejoin="round"
                                                                                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                                                                                        />
                                                                                                    </svg>
                                                                                                </div>
                                                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                                    <h3
                                                                                                        className="text-base font-semibold text-gray-900"
                                                                                                        id="modal-title"
                                                                                                    >
                                                                                                        Delete
                                                                                                        account
                                                                                                    </h3>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    authContext.deleteAccount();
                                                                                                    setShowDeleteAccountModal(
                                                                                                        false
                                                                                                    );
                                                                                                }}
                                                                                                type="button"
                                                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                                            >
                                                                                                Submit
                                                                                            </button>
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setShowDeleteAccountModal(
                                                                                                        false
                                                                                                    );
                                                                                                }}
                                                                                                type="button"
                                                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );

                                                                if (
                                                                    showPasswordModal
                                                                )
                                                                    return (
                                                                        <div
                                                                            className="relative z-10"
                                                                            aria-labelledby="modal-title"
                                                                            role="dialog"
                                                                            aria-modal="true"
                                                                        >
                                                                            <div
                                                                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                                                                aria-hidden="true"
                                                                            ></div>

                                                                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                            <div className="sm:flex sm:items-start">
                                                                                                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                                                    <svg
                                                                                                        className="h-6 w-6 text-red-600"
                                                                                                        fill="none"
                                                                                                        viewBox="0 0 24 24"
                                                                                                        stroke-width="1.5"
                                                                                                        stroke="currentColor"
                                                                                                        aria-hidden="true"
                                                                                                        data-slot="icon"
                                                                                                    >
                                                                                                        <path
                                                                                                            stroke-linecap="round"
                                                                                                            stroke-linejoin="round"
                                                                                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                                                                                        />
                                                                                                    </svg>
                                                                                                </div>
                                                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                                    <h3
                                                                                                        className="text-base font-semibold text-gray-900"
                                                                                                        id="modal-title"
                                                                                                    >
                                                                                                        Change
                                                                                                        password
                                                                                                    </h3>
                                                                                                    <div className="mt-2">
                                                                                                        <div className="flex items-center">
                                                                                                            <label
                                                                                                                htmlFor="password"
                                                                                                                className="text-sm mr-2"
                                                                                                            >
                                                                                                                Password:
                                                                                                            </label>
                                                                                                            <input
                                                                                                                id="password"
                                                                                                                type="password"
                                                                                                                value={
                                                                                                                    password
                                                                                                                }
                                                                                                                onChange={(
                                                                                                                    e
                                                                                                                ) => {
                                                                                                                    setPassword(
                                                                                                                        e
                                                                                                                            .target
                                                                                                                            .value
                                                                                                                    );
                                                                                                                }}
                                                                                                                className="px-2 py-1 border rounded-sm"
                                                                                                                placeholder="Enter your password"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    authContext.changePassword(
                                                                                                        password
                                                                                                    );
                                                                                                    setShowPasswordModal(
                                                                                                        false
                                                                                                    );
                                                                                                }}
                                                                                                type="button"
                                                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                                            >
                                                                                                Submit
                                                                                            </button>
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setShowPasswordModal(
                                                                                                        false
                                                                                                    );
                                                                                                }}
                                                                                                type="button"
                                                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );

                                                                if (
                                                                    userRole ===
                                                                    "Student"
                                                                )
                                                                    if (
                                                                        editPayment
                                                                    )
                                                                        return (
                                                                            <div className="space-y-4">
                                                                                <div className="flex items-center">
                                                                                    <label
                                                                                        htmlFor="cardName"
                                                                                        className="text-sm mr-2"
                                                                                    >
                                                                                        Name
                                                                                        on
                                                                                        Card:
                                                                                    </label>
                                                                                    <input
                                                                                        id="cardName"
                                                                                        type="text"
                                                                                        value={
                                                                                            cardName
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setCardName(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            );
                                                                                        }}
                                                                                        className="px-2 py-1 border rounded-sm"
                                                                                        placeholder="Enter your name on Card"
                                                                                    />
                                                                                </div>

                                                                                <div className="flex items-center">
                                                                                    <label
                                                                                        htmlFor="cardNumber"
                                                                                        className="text-sm mr-2"
                                                                                    >
                                                                                        Card
                                                                                        Number:
                                                                                    </label>
                                                                                    <input
                                                                                        id="cardNumber"
                                                                                        type="cardNumber"
                                                                                        value={
                                                                                            cardNumber
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setCardNumber(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            );
                                                                                        }}
                                                                                        className="px-2 py-1 border rounded-sm"
                                                                                        placeholder="Enter your Card Number"
                                                                                    />
                                                                                </div>

                                                                                <div className="flex items-center">
                                                                                    <label
                                                                                        htmlFor="billingAddress"
                                                                                        className="text-sm mr-2"
                                                                                    >
                                                                                        Billing
                                                                                        Address:
                                                                                    </label>
                                                                                    <input
                                                                                        id="billingAddress"
                                                                                        type="billingAddress"
                                                                                        value={
                                                                                            billAddress
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setBillingAddress(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            );
                                                                                        }}
                                                                                        className="px-2 py-1 border rounded-sm"
                                                                                        placeholder="Enter your billing address"
                                                                                    />
                                                                                </div>

                                                                                <div className="flex items-center">
                                                                                    <button
                                                                                        className="px-[1.3vw] py-[1vh] bg-[#81B29A] border-2 border-transparent rounded-2xl shadow-lg text-[1.3vw] transition-transform duration-100 ease-in-out transform hover:bg-transparent hover:border-[#81B29A]"
                                                                                        onClick={() => {
                                                                                            userContext.updatePaymentInfo(
                                                                                                cardName,
                                                                                                cardNumber,
                                                                                                billAddress
                                                                                            );
                                                                                            setEditPayment(
                                                                                                false
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        submit
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    else
                                                                        return (
                                                                            <>
                                                                                <h2>
                                                                                    Name
                                                                                    on
                                                                                    Card:{" "}
                                                                                    {
                                                                                        userContext
                                                                                            .user
                                                                                            .cardName
                                                                                    }
                                                                                </h2>
                                                                                <h2>
                                                                                    Card
                                                                                    Number:{" "}
                                                                                    {
                                                                                        userContext
                                                                                            .user
                                                                                            .cardNum
                                                                                    }
                                                                                </h2>
                                                                                <h2>
                                                                                    Billing
                                                                                    Address:{" "}
                                                                                    {
                                                                                        userContext
                                                                                            .user
                                                                                            .billAddress
                                                                                    }
                                                                                </h2>
                                                                            </>
                                                                        );
                                                                else if (
                                                                    editPayment
                                                                )
                                                                    return (
                                                                        <></>
                                                                    );
                                                                else
                                                                    return (
                                                                        <>
                                                                            <h2>
                                                                                Name
                                                                                on
                                                                                Account:{" "}
                                                                                {
                                                                                    name
                                                                                }
                                                                            </h2>
                                                                            <h2>
                                                                                Bank:{" "}
                                                                            </h2>
                                                                            <h2>
                                                                                Routing
                                                                                Number:{" "}
                                                                            </h2>
                                                                        </>
                                                                    );
                                                            })()}
                                                        </div>
                                                    </div>
                                                    {userRole === "Student" ? (
                                                        <div className="flex flex-col">
                                                            <h1 className="text-[1.5vw] px-2 mb-2 mt-[2vw] font-semibold bg-[#9fa5db] bg-opacity-70 rounded-sm">
                                                                Interests:{" "}
                                                            </h1>
                                                            <div className="flex flex-col gap-4 px-6 py-4 h-[20vh] max-h-[40vh] w-[32.4vw] shadow-lg rounded-lg bg-gray-50 text-[1.23vw]">
                                                                <ul className="list-disc list-inside grid grid-cols-2 gap-x-3 gap-y-[0.5vh]">
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
                                                                    </li>
                                                                    <li>
                                                                        Anthropology
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
