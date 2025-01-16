import WishlistItem from "./WishlistItem";
import { Link } from "react-router";



function Wishlist() {

    return (
        <>
        <div className="flex justify-center">
            <div className="flex-col space-y-4">
                <div className="flex justify-start items-end space-x-4">
                    <h1 className="text-4xl space-x-2" >My List</h1>
                    <Link to="/login">
                        <span className="text-md text-gray-500" >logout</span>
                    </Link>
                </div>

                <div className="flex flex-col space-y-1">
                    { [1, 2, 3].map((n) => <WishlistItem key={n} n={n}  />) }
                </div>

            </div>
        </div>
        </>
    );
}

export default Wishlist;
