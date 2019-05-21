import React from 'react'
import { Component } from 'react'
import './Notes.css'
import NoteFormat from '../NoteFormat/NoteFormat';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import NotefulContext from '../NotefulContext';
import { getNotes } from '../note-filters' 

//Displays all notes when file isn't chosen//
class Notes extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NotefulContext;
    render(){
        const { notes } = this.context
        const { clickedFolder } = this.props.match.params
        const getNotesForFolder = getNotes(notes, clickedFolder)
        const noteFormat = getNotesForFolder.map(note =>
            <NoteFormat
            key={note.id}
            id={note.id}
            note_title={note.note_title}
            date_published={note.date_published}
            />
        )
        return(
            <div className='notes-container'>
                <div className='notes'>
                    <ul className='notes-list'>
                        { noteFormat }
                    </ul>  
                </div>
                <Link to='/add-note'><i className="fas fa-plus" alt='plus-sign-button'></i></Link>
            </div>
            )
        }
    }

    export default Notes
    
   

