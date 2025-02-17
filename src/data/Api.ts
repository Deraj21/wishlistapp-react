const BASE_URL = '/api';
const targets = {
    items: '/items',
    item: '/item',
}

export type Item = {
    id?: string,
    text?: string,
    imageSource?: string,
    linkText?: string,
    show?: boolean,
    isClaimed?: boolean,
    claimedBy?: string
}

export default {
    getItems: async function() {
        try {
            const response = await fetch(`${BASE_URL}${targets.items}`)
            if (!response.ok) {
                throw new Error('Failed to fetch items')
            }

            return await response.json().catch(error => { console.error(error) })
        }
        catch (error) {
            console.error(error)
        }
    },
    getItem: async function(id: string) {
        try {
            const response = await fetch(`${BASE_URL}${targets.item}/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch item')
            }

            return await response.json().catch(error => { console.error(error) })
        }
        catch (error) {
            console.error(error)
        }
    },
    createItem: async function(item: Item) {
        try {
            const response = await fetch(`${BASE_URL}${targets.item}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            if (!response.ok) {
                throw new Error('Failed to create item')
            }

            return await response.json().catch(error => { console.error(error) })
            //
        }
        catch (error) {
            console.error(error)
        }
    },
    deleteItem: async function(id: string) {
        if (!id) {
            console.error('Missing id')
            return
        }
        try {
            const response = await fetch(`${BASE_URL}${targets.item}/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Failed to delete item')
            }

            return await response.json().catch(error => { console.error(error) })
        }
        catch (error) {
            console.error(error)
        }
    },
    updateItem: async function(id: string | undefined, item: Item) {
        if (!id) {
            console.error('Missing id')
            return
        }
        try {
            const response = await fetch(`${BASE_URL}${targets.item}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            if (!response.ok) {
                throw new Error('Failed to update item')
            }

            return await response.json().catch(error => { console.error(error) })
        }
        catch (error) {
            console.error(error)
        }
    }
}