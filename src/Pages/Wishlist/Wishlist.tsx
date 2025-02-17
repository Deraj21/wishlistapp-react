import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { Link } from "react-router";
import api, { Item } from "../../data/Api";

let emptyList : Item[] = []

function Wishlist() {
    // const wishlistItems = db.getItems()
    let [wishlistItems, setWishlistItems] = useState(emptyList)

    useEffect(() => {
        api.getItems().then(data => setWishlistItems(data))
    }, [])

    const createNewItem = () => {
        api.createItem({}).then(() => {
            api.getItems().then(data => setWishlistItems(data))
        })
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
                    { wishlistItems.map((data, i) => <WishlistItem key={i} data={data} setWishlistItems={setWishlistItems} />) }
                </div>

                <div className="flex justify-center" >
                    <button type="button"
                        className="bg-white flex justify-between items-center space-x-2 mx-2 border border-gray-300 rounded px-2 py-1"
                        onClick={() => createNewItem()}
                    >
                        + Add New Item
                    </button>
                </div>

            </div>
        </div>
        </>
    );
}

export default Wishlist;
