import React from 'react'


const NotefulContext = React.createContext({
    displayedNotes: () => [],
    folders: [],
    deleteNote: () => {},
    deleteFolder: () => {},
})

export default NotefulContext