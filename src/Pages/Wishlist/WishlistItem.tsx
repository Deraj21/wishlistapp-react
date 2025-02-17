import { useEffect, useState } from 'react';

import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// import StorageHandler from '../../data/StorageHandler';
import api, { Item } from "../../data/Api";
import LinkMenu from './LinkMenu';

function WishlistItem(props: { itemData: Item, setWishlistItems: Function }) {

    let { itemData } = props

    const [imageMenuTarget, setImageMenuTarget] = useState<EventTarget|null>(null)
    const [linkMenuTarget, setLinkMenuTarget] = useState<EventTarget|null>(null)
    const [item, setItem] = useState<Item>(itemData)

    useEffect(() => {
        setItem(itemData)
    }, [itemData])

    const updateItem = (field : string, value: any) => {
        if (item.id === undefined) {
            return
        }
        if ([ "text", "imageSource", "linkText" ].find(f => f === field)) {
            setItem({ ...item, [field]: value })
            return
        }

        api.updateItem(item.id, { ...item, [field]: value }).then(() => {
            api.getItems().then(newListData => props.setWishlistItems(newListData))
        })
    }

    const unfocus = () => {
        if (item.id === undefined) {
            return
        }
        api.updateItem(item.id, item).then(() => {
            api.getItems().then(data => props.setWishlistItems(data))
        })
    }

    const openImageMenu = (target: EventTarget|null) => {
        setImageMenuTarget(target)
    }

    const openLinkMenu = (target: EventTarget|null) => {
        setLinkMenuTarget(target)
    }

    const deleteItem = () => {
        window.confirm("Are you sure you want to delete this item?") &&
        api.deleteItem(item.id ? item.id : "").then(() => {
            api.getItems().then(data => props.setWishlistItems(data))
        })
    }

    return (
        <div>
            <div className="bg-white flex justify-between items-center space-x-2 mx-2 border border-gray-300 rounded px-2 py-1" >
                <input
                    className="text-lg py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded"
                    type="text"
                    placeholder="I want..."
                    value={item.text}
                    onChange={(e) => updateItem("text", e.target.value)}
                    onBlur={() => unfocus()}
                />
                <div className="flex flex-col items-center space-y-8">
                    <div className="cursor-pointer hover:text-gray-400"
                        title={item.imageSource ? "" : "add image"}
                        onClick={(e) => openImageMenu(e.target)}
                    >
                        {
                            item.imageSource
                                ? <PhotoOutlinedIcon />
                                : <AddPhotoAlternateOutlinedIcon />
                        }
                    </div>
                    <LinkMenu target={imageMenuTarget} source={item.imageSource} itemId={item.id}
                        clearTarget={() => setImageMenuTarget(null)} type="image"
                        updateItem={updateItem} setWishlistItems={props.setWishlistItems}
                        unfocus={unfocus}
                    />
                </div>
                <div className="flex flex-col items-center space-y-8">
                    <div className="cursor-pointer hover:text-gray-400"
                        title={(item.imageSource ? "link" : "add link")}
                        onClick={(e) => openLinkMenu(e.target)}
                    >
                        {
                            item.linkText
                                ? <LinkOutlinedIcon />
                                : <AddLinkOutlinedIcon />
                        }
                    </div>
                    <LinkMenu target={linkMenuTarget} source={item.linkText} itemId={item.id}
                        clearTarget={() => setLinkMenuTarget(null)} type="link"
                        updateItem={updateItem} setWishlistItems={props.setWishlistItems}
                        unfocus={unfocus}
                    />
                </div>
                <div className="cursor-pointer hover:text-gray-400"
                    title={(item.show ? "showing" : "hidden")}
                    onClick={() => updateItem("show", !item.show)}
                >
                    {
                        item.show
                        ? <VisibilityOutlinedIcon />
                        : <VisibilityOffOutlinedIcon />
                    }
                </div>
                <div className='hover:text-gray-400 cursor-pointer'
                    onClick={() => deleteItem()}
                >
                    <DeleteOutlinedIcon />
                </div>
                
            </div>
        </div>
    );
}

export default WishlistItem;