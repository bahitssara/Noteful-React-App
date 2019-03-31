import React from 'react'
import { Link } from 'react-router-dom'
import './FolderFormat.css'

export default function FolderFormat(props) {
    return(
        <div className='folder-format'>
            <div className='folder-format-container'>
                <h2 className='folder-name'>
                    <Link to={`/folder-content/${props.id}`}>{props.name}</Link>
                </h2>
            </div>
        </div>
    )
}