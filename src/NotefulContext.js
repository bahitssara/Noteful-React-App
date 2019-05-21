import React from 'react'


const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
    editNote: () => {},
    editFolder: () => {}
})

export default NotefulContext