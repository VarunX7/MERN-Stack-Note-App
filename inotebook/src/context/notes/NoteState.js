import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "65256614846338f2ebcb48d5",
            "user": "6523a1da17734822ca38134a",
            "title": "this is title innit3",
            "description": "this is description obviously, innit3",
            "tag": "general",
            "date": "2023-10-10T14:56:20.291Z",
            "__v": 0
        },
        {
            "_id": "6526b9f31cad86527f2278ad",
            "user": "6523a1da17734822ca38134a",
            "title": "this is title innit3",
            "description": "this is description obviously, innit3",
            "tag": "general",
            "date": "2023-10-11T15:06:27.985Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
