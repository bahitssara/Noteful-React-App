import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import './NoteFormat.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import config from '../config'

class NoteFormat extends React.Component {
    
    static contextType = NotefulContext;
    
    handleClickDelete = e => {
        e.preventDefault();
        const noteId= this.props.id
        fetch(config.API_ENDPOINT + `/notes/${noteId}`,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`,
        }
    })

        .then(res => {
            if (!res.ok) return res.json().then(error => Promise.reject(error));
        })
        .then(() => {
            this.context.deleteNote(noteId);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error({error})
        })
    }


    render(){
        const { note_title, id, date_published } = this.props
        return(
            <li className='note-format'>
            <h2 className='note-name'>
                <Link to={`/notes/${id}`}>
                {note_title}
                </Link>
            </h2>
            <button 
                className='delete-button'
                type='button'
                onClick={this.handleClickDelete}
                >Remove Note</button>
            <Link to={`/edit-notes/${id}`}>
            <button 
                className='delete-button'
                type='button'
                >Edit Note</button>
                </Link>  
            <div className='note-edits'>
                <p>Modified:</p>
                <span className='date-modified'>
                    {format(date_published, 'MM/DD/YYYY')}
                </span>
            </div>
        </li>
    )}
}

NoteFormat.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    onDeleteNote: PropTypes.func,
}


export default NoteFormat;

