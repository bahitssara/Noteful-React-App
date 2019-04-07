import React from 'react'


const NotefulContext = React.createContext({
    folders: [],
    displayedNotes: [],
    deleteNote: () => {},
})

export default NotefulContext