const BASE_URL = '/api';
const targets = {
    items: '/items',
    item: '/item',
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
    }
}