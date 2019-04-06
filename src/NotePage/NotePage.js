import React from 'react'
import NotefulContext from '../NotefulContext'
import NoteMain from '../NoteMain/NoteMain'



class NotePage extends React.Component {
    static contextType = NotefulContext

    render(){ 
            const findNote = ({ match }) => {
                this.context.notes.find(note => {
                return note.id === match.params.noteId
            })
        }

        return(
            <NoteMain 
                      note={ findNote }
                      folders={this.context.folders}
                    />
        )
    }
}

export default NotePage