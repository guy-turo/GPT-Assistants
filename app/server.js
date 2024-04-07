const PORT = 8080
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

const URI = 'https://api.openai.com/v1/chat/completions'
app.post('/completions', async(req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: req.body.message }],
            max_tokens: 100
        })
    }
    try {

        const response = await fetch(URI, options)
        const data = await response.json()
        res.send(data)
    } catch (error) { console.error(error) }
})
app.listen(PORT, () => { console.log('server running on port' + PORT) })