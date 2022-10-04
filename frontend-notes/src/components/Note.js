import React from 'react'

const Note = ({note, handleImportance, handleDefaultContentChange, handleChange, handleClick, handleDelete}) => {
    
    const label = note.important ? 'make not important' : 'make important'

    

    return (
        <li>
            {note.content} 
            <button onClick={handleImportance}>{label}</button>
            <input 
                
                type="text"
                id="message"
                name="message"
                
                onChange={handleChange}
                
            />
            <button onClick={handleClick}>vaihda sisältö</button>
            <button onClick={handleDefaultContentChange}>Vaihda oletussisällöksi</button>
            <button onClick={handleDelete}>Poista</button>
        </li>
    )
}

export default Note