import React from 'react'
import NoteFormat from '../NoteFormat/NoteFormat';
import { Link } from 'react-router-dom'
import './NoteMain.css'

//Note page for when the note is clicked // 
export default function NoteMain(props) {
    const findFolder = props.folders.find(folder => {
        return folder.id === props.note.folderId
    })

    return(
        <div className='note-main-container'>
            <h2 className='folder-name'>{findFolder.name}</h2>
            <Link to='/' id='go-back'>Go Back</Link>
                <section className='note-main'>
                    <NoteFormat
                        id={props.note.id}
                        name={props.note.name}
                        modified={props.note.modified}
                        />
                    <div className='note-content'>
                        {props.note.content.split(/\n \r|\n/).map((cont, i) =>
                            <p key={i}>{cont}</p>
                            )}
                    </div>
            </section>
        </div>
        
    )
}       

NoteMain.defaultProps = {

    note: {
        content: '',
    },
    folders: {
        
    }
}
