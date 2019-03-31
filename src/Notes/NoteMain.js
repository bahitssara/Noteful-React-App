import React from 'react'
import NoteFormat from './NoteFormat';

//Note page for when the note is opened // 
export default function NoteMain(props) {
    return(
        <section className='note-main'>
            <NoteFormat
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
                />
            <div className='note-content'>
                {props.note.content.map((cont, i) =>
                    <p key={i}>{cont}</p>
                    )}
            </div>
        </section>
    )
}       

NoteMain.defaultProps = {
    note: {
        content: '',
    }
}
