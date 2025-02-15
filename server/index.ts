// Import the express in typescript file
import express from 'express'
import path from 'path'
const __dirname = import.meta.dirname

import itemHandler from './controller/ListItem'

// Initialize the express engine
const app: express.Application = express()

// Take a port 3000 for running server.
const port: number = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))


// Handling '/' Request
app.get('/api/items', itemHandler.getItems)
app.get('/api/item/:id', itemHandler.getItem)
app.post('/api/item', itemHandler.createItem)
app.put('/api/item/:id', itemHandler.updateItem)
app.delete('/api/item/:id', itemHandler.deleteItem)

// All other requests should return the React app's index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`)
    console.log(__dirname)
})