
import Note from "./components/Note"
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('add new note...')
  const [showAll, setShowAll] = useState(true)
  const [modifiedNote, setModifiedNote] = useState('')
  const [joke, setJoke] = useState('kohta tässä on vitsi!')
  
  
  const url = 'http://localhost:3001/notes'

  const config = {
    headers: {
      Accept: "application/json",
    }
}

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
      console.log(initialNotes)
      
    })

    
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important===true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  

  const handleImportanceOf = (id) => {
    console.log(`id is ${id}`)

    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: ! note.important}
    const urlWithId = `${url}/${id}`
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
  }

  const handleDefaultContentChangeOf = (id) => {
    console.log(`id is ${id}`)

    const note = notes.find(n => n.id === id)
    const changedNote = {...note, content: 'Kello oli viisi kun hän kiljaisi.'}
    const urlWithId = `${url}/${id}`
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
  }

  const changeTextOfNote = (id) => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, content: modifiedNote}
    const urlWithId = `${url}/${id}`
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
        setModifiedNote('')
        
      })
      
  }

  const handleNoteModification = (event) => {
    console.log('event modify: '+event.target.value)
    setModifiedNote(event.target.value)
  }

  const getJoke = () => {
    axios
    .get('https://icanhazdadjoke.com/', config)
    .then(response => {
      setJoke(response.data.joke)
      console.log(response.data.joke)
    })
  }

  const deleteNote = (id) => {
    
    noteService
      .remove(id)
      .then(res => {
        console.log(res)
        setNotes(notes => notes.filter(note => note.id != id))
      })
  }

  


  
  return (
    <div>
      <h1>Otsikko</h1>
      <p>{joke}</p>
      <button onClick={getJoke}>Hae vitsi!</button>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            handleImportance={() => handleImportanceOf(note.id)}
            handleDefaultContentChange={() => handleDefaultContentChangeOf(note.id)}
            handleClick={() => changeTextOfNote(note.id)}
            handleChange={handleNoteModification}
            handleDelete={() => deleteNote(note.id)}
            

          />   
        )}      
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
