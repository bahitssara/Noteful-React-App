import React from 'react'
import { NavLink } from 'react-router-dom'
import './FolderFormat.css'
import PropTypes from 'prop-types'

export default function FolderFormat(props) {
    return(
        <div className='folder-format'>
                <h2 className='folder-name'>
                    <NavLink to={`/folder-content/${props.id}`}>{props.name}</NavLink>
                </h2>
        </div> 
    )
}

FolderFormat.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
}