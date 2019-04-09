import React from 'react'
import {Link} from 'react-router-dom'
import { format } from 'date-fns';
import './NoteFormat.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

class NoteFormat extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},

      }
      
    static contextType = NotefulContext;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId= this.props.id
 
        fetch(`http://localhost:9090/notes/${noteId}`,{
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(res => {
            if(!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({error})
        })
    }

    render(){
        const { name, id, modified } = this.props
        
        return(
            <li className='note-format'>
            <h2 className='note-name'>
                <Link to={`/note/${id}`}>
                {name}
                </Link>
            </h2>
            <button 
                className='delete-button'
                type='button'
                onClick={this.handleClickDelete}
                >Remove Note</button>
            <div className='note-edits'>
                <p>Modified: {' '}</p>
                <span className='date-modified'>
                    {format(modified, 'MM/DD/YYYY')}
                </span>
            </div>
        </li>
    )}

}

NoteFormat.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
    onDeleteNote: PropTypes.func,
}


export default NoteFormat

