import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { Link } from "react-router";
import StorageHandler, { Item } from "../../data/StorageHandler";

let emptyList : Item[] = []

function Wishlist() {

    let db = new StorageHandler()
    // const wishlistItems = db.getItems()
    let [wishlistItems, setWishlistItems] = useState(emptyList)

    useEffect(() => {
        setWishlistItems(db.getItems())
    }, [])

    const createNewItem = () => {
        db.createItem()
    }

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
                    { wishlistItems.map((data, i) => <WishlistItem key={i} data={data} />) }
                </div>

                <button type="button"
                    className=""
                    onClick={() => createNewItem()}
                >
                    + Create New
                </button>

            </div>
        </div>
        </>
    );
}

export default Wishlist;
