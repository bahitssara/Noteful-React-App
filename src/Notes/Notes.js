import React from 'react'
import './Notes.css'
import NoteFormat from '../NoteFormat/NoteFormat';
import { Link } from 'react-router-dom/cjs/react-router-dom';

//Displays all notes when file isn't chosen//
export default function Notes(props){
    const noteFormat = props.notes.map(note =>
        <NoteFormat
            key={note.id}
            id={note.id}
            name={note.name}
            modified={note.modified}
            />
        )
    return(
        <div className='notes'>
            <ul className='notes-list'>
                { noteFormat }
            </ul>  
            <Link to='/add-note'>Add Note</Link>
        </div>
    )
    
}
Notes.defaultProps = {
    notes: [],
}

