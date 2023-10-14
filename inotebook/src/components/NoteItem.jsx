import React, { useContext } from 'react'
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, editNote } = props

    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <FontAwesomeIcon className='mx-2' icon={faTrashCan} style={{ "cursor": "pointer" }} onClick={()=>{deleteNote(note._id)}}/>
                    <FontAwesomeIcon className='mx-2' icon={faPenToSquare} style={{ "cursor": "pointer" }} onClick={()=>{editNote(note)}}/>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
