import { useState } from 'react';

import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StorageHandler, { Item } from '../../data/StorageHandler';
import LinkMenu from './LinkMenu';

function WishlistItem(props: { data: Item, setWishlistItems: Function }) {

    let { data } = props
    let db = new StorageHandler()

    const [imageMenuTarget, setImageMenuTarget] = useState<EventTarget|null>(null)
    const [linkMenuTarget, setLinkMenuTarget] = useState<EventTarget|null>(null)

    const updateItem = (field : string, value: any, id? : string) => {
        // setItem({ ...item, [field]: value })
        db.updateItem(id ? id : data.id, { ...data, [field]: value})
            .then(data => props.setWishlistItems(data))
    }

    const openImageMenu = (target: EventTarget|null) => {
        setImageMenuTarget(target)
    }

    const openLinkMenu = (target: EventTarget|null) => {
        setLinkMenuTarget(target)
    }

    const deleteItem = () => {
        window.confirm("Are you sure you want to delete this item?") &&
        db.deleteItem(data.id).then(data => props.setWishlistItems(data))
    }

    return (
        <div>
            <div className="bg-white flex justify-between items-center space-x-2 mx-2 border border-gray-300 rounded px-2 py-1" >
                <input
                    className="text-lg py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded"
                    type="text"
                    placeholder="I want..."
                    value={data.text}
                    onChange={(e) => updateItem("text", e.target.value)}
                />
                <div className="flex flex-col items-center space-y-8">
                    <div className="cursor-pointer hover:text-gray-400"
                        title={data.imageSource ? "" : "add image"}
                        onClick={(e) => openImageMenu(e.target)}
                    >
                        {
                            data.imageSource
                                ? <PhotoOutlinedIcon />
                                : <AddPhotoAlternateOutlinedIcon />
                        }
                    </div>
                    <LinkMenu target={imageMenuTarget} source={data.imageSource} itemId={data.id}
                        clearTarget={() => setImageMenuTarget(null)} type="image"
                        updateItem={updateItem} setWishlistItems={props.setWishlistItems}
                    />
                </div>
                <div className="flex flex-col items-center space-y-8">
                    <div className="cursor-pointer hover:text-gray-400"
                        title={(data.imageSource ? "link" : "add link")}
                        onClick={(e) => openLinkMenu(e.target)}
                    >
                        {
                            data.linkText
                                ? <LinkOutlinedIcon />
                                : <AddLinkOutlinedIcon />
                        }
                    </div>
                    <LinkMenu target={linkMenuTarget} source={data.linkText} itemId={data.id}
                        clearTarget={() => setLinkMenuTarget(null)} type="link"
                        updateItem={updateItem} setWishlistItems={props.setWishlistItems}
                    />
                </div>
                <div className="cursor-pointer hover:text-gray-400"
                    title={(data.show ? "showing" : "hidden")}
                    onClick={() => updateItem("show", !data.show)}
                >
                    {
                        data.show
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