import React from 'react'
import { NavLink } from 'react-router-dom'
import './FolderFormat.css'

export default function FolderFormat(props) {
    return(
        <div className='folder-format'>
                <h2 className='folder-name'>
                    <NavLink to={`/folder-content/${props.id}`}>{props.name}</NavLink>
                </h2>
        </div> 
    )
}