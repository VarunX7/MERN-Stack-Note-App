import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context    

    const [newNote, setNewNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(newNote)
        setNewNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNewNote({...newNote, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="title" value={newNote.title} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description"  name="description" value={newNote.description} onChange={onChange} style={{height: '130px'}}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" id="tag"  name="tag" value={newNote.tag} onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Save</button>
        </form>
      </div>
      <hr class="border border-dark border-1 opacity-50"></hr>
    </div>
  )
}

export default AddNote
