import { useNavigate } from "react-router";
import { useState } from "react";

// import reactLogo from "/react.svg";
import candyPNG from "/candy-lg.png"
import LinkMenu from "../Wishlist/LinkMenu";


function LoginButtons() {

    const nav = useNavigate()

    const navigateToWishlist = () => {
        nav("/mylist")
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (<>
        <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center items-center space-x-2 mt-20">
                <span className="text-4xl text-gray-900">Wish</span>
                <img src={candyPNG} className="logo" width="60" alt="React logo" />
                <span className="text-4xl text-gray-900">List</span>
            </div>

            <h1 className="text-gray-900 text-2xl">Sign into your account</h1>


            <div className="flex flex-col space-y-2">
                {
                    ["username", "password"].map((placeholder) => {
                        return (
                            <input key={placeholder}
                                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-green-900 focus:outline-none"
                            type={placeholder === "password" ? "password" : "text"}
                            placeholder={placeholder}></input>
                        )
                    })
                }
                <button type="submit"
                    className="px-2 py-1 rounded-md focus:ring-2 focus:ring-green-900 bg-red-500 text-white focus:outline-none"
                    onClick={() => navigateToWishlist()}
                >
                    Login
                </button>
                {
                    ["Login with Google 🔎", "Login with Facebook 📘"].map((buttonText) => {
                        return (
                            <button key={buttonText}
                                type="button"
                                className="bg-white rounded-md px-2 py-1 focus:ring-2 focus:ring-green-900 focus:outline-none"
                                onClick={() => navigateToWishlist()}
                            >{buttonText}</button>
                        )
                    })
                }
            </div>
        </div>
    </>)
}

export default LoginButtons