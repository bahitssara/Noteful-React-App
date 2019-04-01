import React from 'react'
import { Link } from 'react-router-dom'
import './Folders.css'
import FolderFormat from '../FolderFormat/FolderFormat'

export default function Folders(props){
        return(
            <div className='folders'>
                <ul className='folder-list'>
                    {props.folders.map(folder => 
                        <li key={folder.id} className='folder-li'>
                        <FolderFormat
                            id={folder.id}
                            name={folder.name}/>
                        </li>
                    )}
                </ul>
                <div class ='add folder-container'>
                    <Link to='/add-folder'>
                        Add Folder
                    </Link>
                </div>
            </div>
        )
    }

    

