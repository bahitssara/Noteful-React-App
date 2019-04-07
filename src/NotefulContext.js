import React from 'react'


const NotefulContext = React.createContext({
    folders: [],
    displayedNotes: [],
    deleteNote: () => {},
    deleteFolder: () => {},
})

export default NotefulContext