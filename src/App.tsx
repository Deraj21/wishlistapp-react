import { useEffect } from 'react'
import Routing from './config/routes.tsx'
import StorageHandler from './data/StorageHandler.ts'


function App() {

    // setup local storage
    useEffect(() => {
        let db = new StorageHandler()
        db.initializeWishlist()
    }, [])

    return (
        <div className="bg-gray-100 h-screen">
            <Routing />
        </div>
    )
}

export default App
