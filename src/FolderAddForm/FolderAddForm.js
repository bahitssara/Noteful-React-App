import React from 'react'


class FolderAddForm extends React.Component {
    render() {
        return(
            <section className='add-folder'>
                <h2>New Folder</h2>
                <form>
                    <label htmlFor='add-folder-input'>
                        Folder Name
                    </label>
                    <input type='text' id='add-folder-input'/>
                    <button type='submit'>
                        Add 
                    </button>
                </form>
            </section>

        )
    }
}

export default FolderAddForm