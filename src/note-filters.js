export const findNote = (notes=[], id) =>
    notes.find(note => note.id === parseInt(id))

  export const getNotes = (notes=[], folderId) => (
    (!folderId)
      ? notes
      : notes.filter(note => note.folderId === parseInt(folderId))
  )
  