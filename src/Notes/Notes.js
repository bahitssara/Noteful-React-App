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
            name={note.name}
            modified={note.modified}
            />
        )
        
        return(
            <div className='notes'>
                <ul className='notes-list'>
                <Link to='/add-note'><i className="fas fa-plus"></i></Link>
                    { noteFormat }
                </ul>  
            </div>
            )
        }
    }

    export default Notes
    
   

