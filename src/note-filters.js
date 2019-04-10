export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

  export const getNotes = (notes=[], folderId) => (
    (!folderId)
      ? notes
      : notes.filter(note => note.folderId === folderId)
  )
  