import React from 'react'

class NoteAddForm extends React.Component {
      render() {
        return (
          <section className='AddNote'>
            <h2>Create a note</h2>
            <form>
            <div className='field'>
                <label htmlFor='note-folder-input'>
                  Choose Folder:
                </label>
                <select type='select' id='note-folder-input' placeholder='choose folder:'>
                  <option>Choose Folder:</option>
                  <option>Folder names</option>
                </select>
              </div>
              <div className='field'>
                <label htmlFor='note-name-input'>
                  Name
                </label>
                <input type='text' id='note-name-input' />
              </div>
              <div className='field'>
                <label htmlFor='note-content-input'>
                  Content
                </label>
                <textarea id='note-content-input' />
              </div>
             
                <button type='submit'>
                  Add note
                </button>
            </form>
          </section>

         ) 
        }
    }
    export default NoteAddForm