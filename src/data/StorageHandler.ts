export type Item = {
    id: string,
    text: string,
    imageSource: string,
    hasImage: boolean,
    linkText: string,
    hasLink: boolean,
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
        hasImage: false,
        linkText: "",
        hasLink: false,
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


    createItem() {
        let wishlist = this.getItems()
        let newItem = { ...this.#emptyItem, id: ""+Date.now() }
        wishlist.push(newItem)
        this.saveItems(wishlist)
    }

    updateItem(id: string, value: Item) {
        let wishlist = this.getItems()
        let index = wishlist.findIndex((i:Item) => i.id === id)
        wishlist[index] = { ...wishlist[index], ...value }
        this.saveItems(wishlist)
    }

    deleteItem(id: string) {
        let wishlist = this.getItems()
        let index = wishlist.findIndex((i: Item) => i.id === id)
        if (index != -1) {
            wishlist.splice(index, 1)
        }
        this.saveItems(wishlist)
    }

    saveItems(wishlist: Item[]) {
        this.localStorage.wishlistString = JSON.stringify(wishlist)
    }

    getItems(): Item[] {
        return JSON.parse(this.localStorage.wishlistString)
    }

    getItem(id: string) {
        let wishlist: Item[] = this.getItems()
        return wishlist.find((i: Item) => i.id === id)
    }

    get(key: string) {
        return this.localStorage.getValue(key)
    }

    set(key: string, value: string) {
        this.localStorage.setValue(key, value)
    }
}