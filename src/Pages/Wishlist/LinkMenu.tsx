
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';

// import { Item } from '../../data/StorageHandler';

const PLACEHOLDER_IMAGE_TEXT = "https://placehold.co/300x200?text=your+image+here"

type LinkMenuProps = {
    target: EventTarget | null,
    source: string,
    itemId: string,
    updateItem: Function,
    setWishlistItems: Function,
    clearTarget: Function
}

function LinkMenu(props: LinkMenuProps) {



    return (
        <div className={`bg-white p-4 border border-gray-300 rounded-md flex flex-col space-y-4 mx-2 shadow-md ` + 
            (props.target ? "absolute" : "hidden") + 
            ` before:content-[""] before:border-[5px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:border-b-black before:absolute before:bottom-[100%] before:left-1/2`}
        >
            <div className="cursor-pointer absolute top-0 right-0 p-2 hover:text-red-500"
                onClick={() => props.clearTarget()}
                title="Close"
            >
                <CloseIcon />
            </div>
            <div className="flex justify-start items-center space-x-2">
                <input type="text" placeholder="[ paste image link ]"
                    className="border border-gray-300 rounded-md px-2 py-1 focus:ring-1 focus:ring-green-900 focus:outline-none"
                    value={props.source}
                    onChange={function(e) {
                        props.updateItem("imageSource", e.target.value, props.itemId)
                    }}
                />
                {
                    props.source
                    ? <a target="_blank" rel="noreferrer noopener"
                        className="cursor-pointer hover:text-blue-500"
                        href={props.source}
                    >
                        {``}<OpenInNewIcon />
                    </a>
                    :
                    ''
                }
            </div>
            <img width="300" src={props.source ? props.source : PLACEHOLDER_IMAGE_TEXT} alt="list item image" />
        </div>
    )
}

export default LinkMenu