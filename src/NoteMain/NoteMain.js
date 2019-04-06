import React from 'react'
import NoteFormat from '../NoteFormat/NoteFormat';
import { Link } from 'react-router-dom'
import './NoteMain.css'
import NotefulContext from '../NotefulContext';
import { findNote } from '../note-filters'

//Note page for when the note is clicked // 
class NoteMain extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }

    static contextType = NotefulContext
        render(){
            const { displayedNotes }= this.context
            const { noteId } = this.props.match.params
            const filteredNote = findNote(displayedNotes, noteId) || { content: ''}
            const findFolder =
            this.context.folders.find(folder => {
                return folder.id === filteredNote.folderId
            })
            
            return(
                <div className='note-main-container'>
                    <h2 className='folder-name'>{findFolder.name}</h2>
                    <Link to='/' id='go-back'>Go Back</Link>
                        <section className='note-main'>
                            <NoteFormat
                                id={filteredNote.id}
                                name={filteredNote.name}
                                modified={filteredNote.modified}
                                />
                            <div className='note-content'>
                                {filteredNote.content.split(/\n \r|\n/).map((cont, i) =>
                                    <p key={i}>{cont}</p>
                                    )}
                            </div>
                    </section>
                </div>
                
            )
        } 
    }       

export default NoteMain