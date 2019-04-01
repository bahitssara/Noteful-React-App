import React from 'react'
import { NavLink } from 'react-router-dom'
import { countNotes } from '../note-filters';

export default function NoteNav(props) {
  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='note-nav-count'>
                {countNotes(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <button
          to='/add-folder'
          type='button'
          className='add-folder'
        >
                &#43;
          <br />
          Folder
        </button>
      </div>
    </div>
  )
}

NoteNav.defaultProps = {
  folders: []
}