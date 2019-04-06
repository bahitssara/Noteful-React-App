import React from 'react'
import { Component } from 'react'
import Folders from '../Folders/Folders'
import Notes from '../Notes/Notes'
import NotefulContext from '../NotefulContext';

class NoteFilter extends Component {

    static contextType = NotefulContext
    
    render() {
        const displayNotes = 
            this.context.displayedNotes.filter(note => {
                return note.folderId === this.props.match.params.clickedFolder
            })    
        
            
        return(
            <>
            <Folders 
                folders={this.context.folders} />
            <Notes 
                notes={ displayNotes } />
            </>
        )
    }
}

export default NoteFilter