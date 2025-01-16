import reactLogo from "/react.svg";
import { useNavigate } from "react-router";


function LoginButtons() {

    const nav = useNavigate()

    const navigateToWishlist = () => {
        nav("/mylist")
    }

    return (<>
        <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-6 mt-20">
                <img src={reactLogo} className="logo" alt="React logo" />
            </div>

            <h1 className="text-gray-900 text-2xl">Sign into your account</h1>


            <div className="flex flex-col space-y-2">
                {
                    ["username", "password"].map((placeholder) => {
                        return (
                            <input key={placeholder}
                                className="border border-gray-200 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            type={placeholder === "password" ? "password" : "text"}
                            placeholder={placeholder}></input>
                        )
                    })
                }
                {
                    ["Login with Google 🔎", "Login with Facebook 📘"].map((buttonText) => {
                        return (
                            <button key={buttonText}
                                type="button"
                                className="border-2 border-gray-400 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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