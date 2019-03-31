import React from 'react'
import './Notes.css'
import NoteFormat from './NoteFormat';


export default function Notes(props){
        //ADD AN ADD NOTE BUTTON(AS A COMPONENT)
        return(
            <div className='notes'>
                <ul className='notes-list'>
                {props.notes.map(note =>
                    <li key={note.id}>
                    <NoteFormat
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                    />
                </li>
                )}
            </ul>  
            <button className='add-note'>Add Note</button>
            </div>
        )
    
}

