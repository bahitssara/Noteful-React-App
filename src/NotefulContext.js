import React from 'react'


const NotefulContext = React.createContext({
    folders: [],
    displayedNotes: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {}
})

export default NotefulContext