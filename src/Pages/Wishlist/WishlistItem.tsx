import { useState } from 'react';

import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const dummy_item = {
    text: "",
    imageSource: "",
    hasImage: false,
    linkText: "",
    hasLink: false,
    show: true,
    isClaimed: false,
    claimedBy: ""
}

function WishlistItem(props: { n: number }) {

    const [item, setItem] = useState(dummy_item);

    const updateItem = (field : string, value: any) => {
        setItem({ ...item, [field]: value });
    }

    return (
        <>
            <div className="flex justify-between items-center space-x-2 mx-2 border border-gray-300 rounded px-2 py-1" >
                <input
                    className="text-lg py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded"
                    type="text"
                    placeholder="I want..."
                    value={item.text} onChange={(e) => updateItem("text", e.target.value)}
                />
                <div className="cursor-pointer hover:text-gray-400"
                    title={item.hasImage ? "" : "add image"}
                    onClick={() => updateItem("hasImage", !item.hasImage)}
                >
                    {
                        item.hasImage
                            ? <PhotoOutlinedIcon />
                            : <AddPhotoAlternateOutlinedIcon />
                    }
                </div>
                <div className="cursor-pointer hover:text-gray-400"
                    title={(item.hasLink ? "link" : "add link")}
                    onClick={() => updateItem("hasLink", !item.hasLink)}
                >
                    {
                        item.hasLink
                        ?
                        // <a title='go somewhere' href={item.linkText} target="_blank" rel="noreferrer">
                            <LinkOutlinedIcon />
                        // </a>
                        : <AddLinkOutlinedIcon />
                    }
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
                
            </div>
        </>
    );
}

export default WishlistItem;