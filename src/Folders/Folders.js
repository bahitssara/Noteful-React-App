import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import './Folders.css'
import FolderFormat from '../FolderFormat/FolderFormat'
import NotefulContext from '../NotefulContext';

class Folders extends Component{
    static contextType = NotefulContext;
    render(){
        const { folders=[] } = this.context

        return(
            <div className='folders'>
                <ul className='folder-list'>
                    <Link to='/add-folder'>
                    <i className="fas fa-folder-plus"></i>
                    </Link>
                        {folders.map(folder => 
                            <li key={folder.id} className='folder-li'>
                            <FolderFormat
                                id={folder.id}
                                name={folder.name}/>
                            </li>
                        )}
                </ul>
            </div>
        )
    }   
}

export default Folders
    

