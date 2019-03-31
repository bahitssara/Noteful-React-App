import React from 'react'
import './Folders.css'

class Folders extends React.Component{
    render(){
        return(
            <div className='folders'>
                <ul className='folder-list'>
                    <li className='folder-li'>
                        FOLDER
                    </li>
                    <li className='folder-li'>
                        FOLDER 2
                    </li>
                </ul>
                <button className='add-folder'>Add Folder</button>
            </div>
        )
    }
}

export default Folders