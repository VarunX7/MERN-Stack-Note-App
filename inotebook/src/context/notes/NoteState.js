import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
    const host = 'http://localhost:8000'      

    const [notes, setNotes] = useState([])

    // GET ALL NOTES...
    const getNotes = async () =>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiJ9.NjUyM2ExZGExNzczNDgyMmNhMzgxMzRh.FQVi5t1kXkcIIA92MgLzKdhWzlnCYcVSdeJf_Gdzm7c'
            },
        })
        const data = await response.json()
        setNotes(data)
    }

    // ADD A NEW NOTE...
    const addNote = async (newNote)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiJ9.NjUyM2ExZGExNzczNDgyMmNhMzgxMzRh.FQVi5t1kXkcIIA92MgLzKdhWzlnCYcVSdeJf_Gdzm7c'
            },
            body: JSON.stringify(newNote)
        })
        
        const data = await response.json()
        setNotes(notes.concat(data))
    }

    // DELETE NOTE...
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiJ9.NjUyM2ExZGExNzczNDgyMmNhMzgxMzRh.FQVi5t1kXkcIIA92MgLzKdhWzlnCYcVSdeJf_Gdzm7c'
            },
        })

        const data = await response.json()
        console.log(data)
        const newNotes = notes.filter((note) =>{return note._id !== id})
        setNotes(newNotes)
    }

    // EDIT A NOTE...
    const updateNote = async (note)=>{
        const {e_title, e_description, e_tag} = note
        const response = await fetch(`${host}/api/notes/updatenote/${note.id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'token': 'eyJhbGciOiJIUzI1NiJ9.NjUyM2ExZGExNzczNDgyMmNhMzgxMzRh.FQVi5t1kXkcIIA92MgLzKdhWzlnCYcVSdeJf_Gdzm7c'
            },
            body: JSON.stringify({title: e_title, description: e_description, tag: e_tag})
        })
        
        const data = await response.json()
        
        
        setNotes((notes)=>{
            for(let i=0; i<notes.length; i++){
                let element = notes[i]
                if(element._id === note._id){
                    element = data
                }
            }
            return notes
        })
    }

    return (
        <noteContext.Provider value={{notes, setNotes, addNote, deleteNote, updateNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
