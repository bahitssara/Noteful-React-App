import React from 'react'
import { Component } from 'react'
import './Notes.css'
import NoteFormat from '../NoteFormat/NoteFormat';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import NotefulContext from '../NotefulContext';

//Displays all notes when file isn't chosen//
class Notes extends Component {
    static contextType = NotefulContext;
    render(){
        const { notes=[] } = this.context
        const noteFormat = notes.map(note =>
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
    }

    export default Notes
    
   

