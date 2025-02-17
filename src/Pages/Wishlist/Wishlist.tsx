import { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { Link } from "react-router";
import api, { Item } from "../../data/Api";

let emptyList : Item[] = []

function Wishlist() {
    let [wishlistItems, setWishlistItems] = useState(emptyList)
    // const [search, setSearch] = useState("")

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

                <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-green-900 focus:outline-none"
                    onChange={function(e) {
                        let search = e.target.value
                        api.getItems(search).then(data => setWishlistItems(data))
                    }}
                ></input>

                <div className="flex flex-col space-y-1">
                    { wishlistItems.map((data, i) => <WishlistItem key={i} itemData={data} setWishlistItems={setWishlistItems} />) }
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
