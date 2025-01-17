import { useState } from 'react';

import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StorageHandler, { Item } from '../../data/StorageHandler';

const EMPTY_ITEM : Item = {
    id: "",
    text: "",
    imageSource: "",
    hasImage: false,
    linkText: "",
    hasLink: false,
    show: true,
    isClaimed: false,
    claimedBy: ""
}

function WishlistItem(props: { data: Item }) {

    let { data } = props
    let db = new StorageHandler()

    // const [item, setItem] = useState(EMPTY_ITEM)

    const updateItem = (field : string, value: any) => {
        // setItem({ ...item, [field]: value })
        db.updateItem(data.id, { ...data, [field]: value})
    }

    const deleteItem = () => {
        db.deleteItem(data.id)
    }

    return (
        <>
            <div className="bg-white flex justify-between items-center space-x-2 mx-2 border border-gray-300 rounded px-2 py-1" >
                <input
                    className="text-lg py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded"
                    type="text"
                    placeholder="I want..."
                    value={data.text}
                    onChange={(e) => updateItem("text", e.target.value)}
                />
                <div className="cursor-pointer hover:text-gray-400"
                    title={data.hasImage ? "" : "add image"}
                    onClick={() => updateItem("hasImage", !data.hasImage)}
                >
                    {
                        data.hasImage
                            ? <PhotoOutlinedIcon />
                            : <AddPhotoAlternateOutlinedIcon />
                    }
                </div>
                <div className="cursor-pointer hover:text-gray-400"
                    title={(data.hasLink ? "link" : "add link")}
                    onClick={() => updateItem("hasLink", !data.hasLink)}
                >
                    {
                        data.hasLink
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
        </>
    );
}

export default WishlistItem;