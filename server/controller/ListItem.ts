// basic express server controller for list items
import express from 'express'
// import bodyParser from 'body-parser'

export type Item = {
    id: string,
    text: string,
    imageSource: string,
    linkText: string,
    show: boolean,
    isClaimed: boolean,
    claimedBy: string
}
const emptyItem : Item = {
    id: "",
    text: "",
    imageSource: "",
    linkText: "",
    show: true,
    isClaimed: false,
    claimedBy: ""
}
const newId = (o?:number) => Date.now()+(o?o:0) + ""

const initialData : Array<Item> = [
    { ...emptyItem, id: newId(0), text: "Item 1" },
    { ...emptyItem, id: newId(1), text: "Item 2" },
    { ...emptyItem, id: newId(2), text: "Item 3" },
]

const itemHandler = {
    // /items
    getItems: function(req: express.Request, res: express.Response) {
        // search parameter
        const search = req.query.search as string
        if (search) {
            res.json(initialData.filter( i => i.text.toLowerCase().includes(search.toLowerCase()) ))
            return
        }
        res.json(initialData)
    },
    // /item/:id
    getItem: function(req: express.Request, res: express.Response) {
        let id = req.params.id
        if (!id) {
            res.status(400).send("Missing id parameter")
            return
        }
        let item = initialData.find(i => i.id === id)
        if (!item) {
            res.status(404).send("Item not found")
            return
        }
        res.json(item)

    },
    // /item
    createItem: function(req: express.Request, res: express.Response) {
        let newItem = { ...emptyItem, id: newId() }
        initialData.push(newItem)
        res.json(newItem)
    },
    // /item/:id
    updateItem: function(req: express.Request, res: express.Response) {
        let id = req.params.id
        if (!id) {
            res.status(400).send("Missing id parameter")
            return
        }

        let item = initialData.find(i => i.id === id)
        if (!item) {
            res.status(404).send("Item not found")
            return
        }

        let updatedItem = { ...item, ...req.body }
        let index = initialData.findIndex(i => i.id === id)
        initialData[index] = updatedItem

        res.json(updatedItem)
    },
    // /item/:id
    deleteItem: function(req: express.Request, res: express.Response) {
        let id = req.params.id
        if (!id) {
            res.status(400).send("Missing id parameter")
            return
        }

        let index = initialData.findIndex(i => i.id === id)
        if (index === -1) {
            res.status(404).send("Item not found")
            return
        }
        
        initialData.splice(index, 1)
        res.status(200).send("Item deleted")
    },
}

export default itemHandler

