import { Routes, Route, useNavigate } from 'react-router';
import LoginButtons from "../Pages/Login/LoginButtons.tsx";
import Wishlist from '../Pages/Wishlist/Wishlist';
import { useEffect } from 'react';

function Redirect() {

    let nav = useNavigate()

    useEffect(() => {
        nav("/login")
    }, [])

    return <></>
}

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Redirect />} />
            <Route path="login" element={<LoginButtons />} />
            <Route path="mylist" element={<Wishlist />} />
        </Routes>
    )
}

export default Routing