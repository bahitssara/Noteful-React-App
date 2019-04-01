import React from 'react'
import {Link} from 'react-router-dom'
import { format } from 'util';
import './NoteFormat.css'


export default function NoteFormat(props) {
    return(
        <li className='note-format'>
            <h2 className='note-name'>
                <Link to={`/note/${props.id}`}>
                {props.name}
                </Link>
            </h2>
            <button className='delete-button'>Remove Note</button>
            <div className='note-edits'>
                <p>Modified {' '}</p>
                <span className='date-modified'>
                    {format(props.modified)}
                </span>
            </div>
        </li>
    )
}
