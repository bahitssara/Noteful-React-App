import React from 'react'
import './Folders.css'
import FolderFormat from './FolderFormat'

export default function Folders(props){
        return(
            <div className='folders'>
                <ul className='folder-list'>
                    {props.folders.map(folder => 
                        <li key={folder.id}>
                        <FolderFormat
                            id={folder.id}
                            name={folder.name}/>
                    </li>
                    )}
                </ul>
                <button className='add-folder'>Add Folder</button>
            </div>
        )
    }


