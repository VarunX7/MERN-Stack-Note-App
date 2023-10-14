import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
// import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(NoteContext)
    const { notes, getNotes, updateNote } = context
    const ref = useRef(null)
    const closeRef = useRef(null)
    const [newNote, setNewNote] = useState({id: "", e_title: "", e_description: "", e_tag: ""})

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [notes])

    const editNote = (currentNote) => {
        ref.current.click()
        setNewNote({id: currentNote._id, e_title: currentNote.title, e_description: currentNote.description, e_tag: currentNote.tag})
    }

    const saveChanges = (e)=>{
        // e.preventDefault()
        updateNote(newNote)
        closeRef.current.click()
        
    }

    const onChange = (e)=>{
        setNewNote({...newNote, [e.target.name]: e.target.value})
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="e_title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" name="e_title" aria-describedby="e_title" value={newNote.e_title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="e_description" name="e_description" value={newNote.e_description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" name="e_tag" value={newNote.e_tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => <NoteItem key={note._id} editNote={editNote} note={note} />)}
            </div>
        </>
    )
}

export default Notes
