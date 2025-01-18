export type Item = {
    id: string,
    text: string,
    imageSource: string,
    linkText: string,
    show: boolean,
    isClaimed: boolean,
    claimedBy: string
}

export default class StorageHandler {
    localStorage: Storage;
    #emptyItem: Item = {
        id: "",
        text: "",
        imageSource: "",
        linkText: "",
        show: true,
        isClaimed: false,
        claimedBy: ""
    }

    constructor() {
        this.localStorage = window.localStorage;
    }

    initializeWishlist() {
        if (this.localStorage.wishlistString) return
        this.saveItems([])
    }


    createItem(): Promise<Item[]> {
        let wishlist = this.#getWishlist()
        let newItem = { ...this.#emptyItem, id: ""+Date.now() }
        wishlist.push(newItem)
        return this.saveItems(wishlist)
    }

    updateItem(id: string, value: Item) {
        let wishlist = this.#getWishlist()
        let index = wishlist.findIndex((i:Item) => i.id === id)
        wishlist[index] = { ...wishlist[index], ...value }
        return this.saveItems(wishlist)
    }

    deleteItem(id: string) {
        let wishlist = this.#getWishlist()
        let index = wishlist.findIndex((i: Item) => i.id === id)
        if (index != -1) {
            wishlist.splice(index, 1)
        }
        return this.saveItems(wishlist)
    }

    saveItems(wishlist: Item[]) : Promise<Item[]> {
        this.localStorage.wishlistString = JSON.stringify(wishlist)
        return new Promise((resolve) => {
            resolve(wishlist)
        })
    }

    #getWishlist(): Item[] {
        return JSON.parse(this.localStorage.wishlistString)
    }

    getItems(): Promise<Item[]> {
        return new Promise((resolve) => {
            let items:Item[] = this.#getWishlist()
            resolve(items)
        })
    }

    getItem(id: string): Promise<Item|undefined> {
        let wishlist: Item[] = this.#getWishlist()
        return new Promise((resolve, reject) => {
            let item = wishlist.find((i: Item) => i.id === id)
            if (item){
                resolve(item)
            } else {
                reject(undefined)
            }
        })
    }
}