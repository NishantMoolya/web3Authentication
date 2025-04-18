"use client"

import { useContext, useState } from "react"
import useWallet from "../hooks/useWallet"
import { useNavigate } from "react-router-dom"
import { setToken } from "../utils/authToken"
import AuthContext from "../context/AuthContext"

export default function LoginCard() {
    const { connectWallet } = useWallet()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [activeButton, setActiveButton] = useState(null)

    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const baseURL = import.meta.env.VITE_API_BASE_URL

    // Handler for generating nonce
    const handleGetNonce = async (signer) => {
        try {
            console.log(signer);
            
            const walletAddress = await signer?.getAddress()
            console.log(walletAddress);
            
            const response = await fetch(baseURL + "/user/nonce", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ walletAddress }),
            })

            const data = await response.json()
            if (response.status === 201) {
                return {nonce:data.data};
            } else {
                setError(data.error)
                return {nonce:null};
            }
        } catch (err) {
            console.error("Error fetching nonce:", err)
            setError("An error occurred while fetching the nonce")
            return {nonce:null};
        }
    }

    // Handler for verifying the signature
    const handleVerifySignature = async (signer,nonce,role) => {
        try {
            const walletAddress = await signer?.getAddress()
            
            const signature = await signer?.signMessage(nonce)

            const response = await fetch(baseURL + "/user/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ walletAddress, signature, role: role }),
            })

            const data = await response.json()
            if (response.status === 201) {
                setToken(data.data.token)
                loginUser(walletAddress,role,true)
                navigate("/profile")
                setError("")
            } else {
                setError(data.error)
            }
        } catch (err) {
            console.error("Error verifying signature:", err)
            setError("An error occurred while verifying the signature")
        }
    }

    const handleLogin = async (role) => {
        setLoading(true)
        setActiveButton(role)
        setError("")
        try {
            const signer = await connectWallet()
            if (!signer) return
            const data = await handleGetNonce(signer)
            if (!data.nonce) return
            await handleVerifySignature(signer,data.nonce,role)
        } catch (err) {
            console.error("Login error:", err)
            setError("Something went wrong during login")
        } finally {
            setLoading(false)
            setActiveButton(null)
        }
    }

    return (
        <div className="w-96 p-8 bg-white border border-purple-100 rounded-lg shadow-lg shadow-purple-100/50 transition-all duration-300 hover:shadow-xl">
            <div className="mb-6">
                <h2 className="font-sans text-4xl font-bold text-purple-800 mb-3 tracking-tight">Welcome</h2>
                <p className="text-gray-600 text-sm mb-6 font-medium">Please select your role to continue</p>
            </div>

            <div className="space-y-4 mb-6">
                <button
                    onClick={() => handleLogin("patient")}
                    disabled={loading}
                    className={`w-full py-3.5 px-4 bg-purple-600 text-white rounded-md font-medium tracking-wide transition-all duration-200 
                    ${loading && activeButton === "patient" ? "bg-purple-400" : "hover:bg-purple-700 active:scale-[0.98]"} 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md hover:shadow-lg`}
                >
                    {loading && activeButton === "patient" ? (
                        <span className="inline-flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Connecting...
                        </span>
                    ) : (
                        "Patient"
                    )}
                </button>

                <button
                    onClick={() => handleLogin("doctor")}
                    disabled={loading}
                    className={`w-full py-3.5 px-4 bg-purple-600 text-white rounded-md font-medium tracking-wide transition-all duration-200 
                    ${loading && activeButton === "doctor" ? "bg-purple-400" : "hover:bg-purple-700 active:scale-[0.98]"} 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md hover:shadow-lg`}
                >
                    {loading && activeButton === "doctor" ? (
                        <span className="inline-flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Connecting...
                        </span>
                    ) : (
                        "Doctor"
                    )}
                </button>

                <button
                    onClick={() => handleLogin("staff")}
                    disabled={loading}
                    className={`w-full py-3.5 px-4 bg-purple-600 text-white rounded-md font-medium tracking-wide transition-all duration-200 
                    ${loading && activeButton === "staff" ? "bg-purple-400" : "hover:bg-purple-700 active:scale-[0.98]"} 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md hover:shadow-lg`}
                >
                    {loading && activeButton === "staff" ? (
                        <span className="inline-flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Connecting...
                        </span>
                    ) : (
                        "Medical Staff"
                    )}
                </button>
            </div>

            {error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md animate-fadeIn">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs py-2 border-t border-purple-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-purple-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="font-medium">Secure login powered by blockchain</p>
                </div>
            )}
        </div>
    )
}
