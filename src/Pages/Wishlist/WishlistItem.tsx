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

    const [menuTarget, setMenuTarget] = useState<EventTarget|null>(null)

    const updateItem = (field : string, value: any, id? : string) => {
        // setItem({ ...item, [field]: value })
        db.updateItem(id ? id : data.id, { ...data, [field]: value})
            .then(data => props.setWishlistItems(data))
    }

    // const openImageMenu = (target: EventTarget|null) => {
    const openImageMenu = (e: MouseEvent) => {
        console.log(e)
        setMenuTarget(e.target)
    }

    const deleteItem = () => {
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
                <div className="cursor-pointer hover:text-gray-400 flex flex-col items-start justify-center"
                    title={data.imageSource ? "" : "add image"}
                    onClick={(e) => openImageMenu(e as unknown as MouseEvent)}
                >
                    {
                        data.imageSource
                            ? <PhotoOutlinedIcon />
                            : <AddPhotoAlternateOutlinedIcon />
                    }
                    <LinkMenu target={menuTarget} source={data.imageSource} itemId={data.id} clearTarget={() => setMenuTarget(null)}
                        updateItem={updateItem} setWishlistItems={props.setWishlistItems}
                    />
                </div>
                <div className="cursor-pointer hover:text-gray-400"
                    title={(data.imageSource ? "link" : "add link")}
                    onClick={(e) => openImageMenu(e as unknown as MouseEvent)}
                >
                    {
                        data.linkText
                        ?
                        // <a title='go somewhere' href={item.linkText} target="_blank" rel="noreferrer">
                            <LinkOutlinedIcon />
                        // </a>
                        : <AddLinkOutlinedIcon />
                    }
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