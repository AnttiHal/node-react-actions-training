require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())


app.use(cors())
app.use(express.static('build'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0
    const note = request.body
    note.id = maxId+1
    notes = notes.concat(note)
    response.json(note)
})



app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id) 
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const modifiedNote = request.body
  notes.map(n => n.id != id ? n:modifiedNote)
  response.json(modifiedNote)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})