require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note')
const { request } = require('express')




app.use(express.json())


app.use(cors())
app.use(express.static('build'))



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error:'sisältö puuttuu'})
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  note.save().then(saved => {
    response.json(saved)
  })
})



app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(note => {
      response.json(note)
    })
    
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const modifiedNote = request.body
  notes.map(n => n.id != id ? n:modifiedNote)
  response.json(modifiedNote)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})