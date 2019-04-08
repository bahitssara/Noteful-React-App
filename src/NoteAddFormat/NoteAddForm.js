import React from 'react'
import NotefulContext from '../NotefulContext'

class NoteAddForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: '',
      folderId: '',
      id:'',
      modified:'',
      name:''
    }
  }

  static contextType = NotefulContext;


  addContent(content) {
    this.setState({
      content
    });
  }

  addNoteName(name) {
    this.setState({
      name
    });
  }

  handleNoteSubmit = e => {
    e.preventDefault();
    const note = (({content,id, name}) => ({content,id, name}))(this.state);

    fetch(`http://localhost:9090/notes`,{
        method: 'POST',
        body:JSON.stringify(note),
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong please try again later');
             }
              return res.json();
        })
        .then(() => {
            this.setState({
                content: '',
                id: '',
                name: '',
                
            });
            this.context.addNote(note);
            this.props.history.push('/')

        })
        .catch(error => {
            console.error({error})
        })
    }

  

      render() {
        return ( 
          <section className='AddNote'>
            <h2>Create a note</h2>
            <form onSubmit={e => this.handleNoteSubmit(e)}> 
            <div className='field'>
                <label htmlFor='note-folder-input'>
                  Choose Folder:
                </label>
                <select type='select' id='note-folder-input'>
                  <option>Choose Folder:</option>
                  {this.context.folders.map(folder =>
                    <option key={folder.id}>{folder.name}</option>
                    )}
                </select>
              </div>
              <div className='field'>
                <label htmlFor='note-name-input'>
                  Name
                </label>
                <input type='text' id='note-name-input' value={this.state.name} onChange={e => this.addNoteName(e.target.value)}/>
              </div>
              <div className='field'>
                <label htmlFor='note-content-input'>
                  Content
                </label>
                <textarea id='note-content-input' value={this.state.content} onChange={e => this.addContent(e.target.value)}/>
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