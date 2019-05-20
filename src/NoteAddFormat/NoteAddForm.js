import React from 'react'
import NotefulContext from '../NotefulContext'
import './NoteAddForm.css'
import ValidationError from '../ValidationError/ValidationError'


class NoteAddForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: '',
      folder: parseInt(),
      id:'',
      date_published: new Date(),
      note_title:'',
      nameValid: false,
      contentValid: false,
      validationMessages: {
        name: '',
        content: '',
      }
    }
  }


  static contextType = NotefulContext;


  addContent(content) {
    this.setState({content}, () => {this.validateContent(content)});
  }

  addNoteName(note_title) {
    this.setState({note_title}, () => {this.validateName(note_title)});
  }

  addFolderId(folder) {
    this.setState({
      folder
    })
  }

  addModified(date_published) {
    this.setState({
      date_published
    })
  }

  handleNoteSubmit = e => {
    e.preventDefault();
    const note = (({content, folder, id, date_published, note_title}) => ({content, folder, id, date_published, note_title}))(this.state);

    fetch(`http://localhost:8000/notes`,{
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
                folder: parseInt(),
                date_published: new Date(),
                id: '',
                note_title: '',
            });
            this.context.addNote(note);
            this.props.history.push('/')

        })
        .catch(error => {
            console.error({error})
        })
  }

  validateName(fieldValue) {
      const fieldErrors = {...this.state.validationMessage}
      let hasError = false;

      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
          fieldErrors.note_title = 'Note title is required';
          hasError = true;
      } else {
          if(fieldValue.length < 3) {
              fieldErrors.note_title = 'Note title must be at least 3 characters long';
              hasError = true;
          } else {
              fieldErrors.note_title = '';
              hasError = false;
          }
      }

      this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
      }, this.formValid);
  }

  formValid(){
      this.setState({
          formValid: this.state.nameValid && this.state.contentValid
      });
  }

  validateContent(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.content = 'Must have content to create a note';
      hasError = true;
    } else {
      if (fieldValue.length < 20 || fieldValue.length > 500) {
        fieldErrors.content = 'Content must be at least 20 characters long';
        hasError = true;
      } else {
        fieldErrors.content = '';
        hasError = false;
      }
    }
    
      this.setState({
        validationMessages: fieldErrors,
        contentValid: !hasError
      }, this.formValid );

    }
      render() {
        return ( 
          
          <section className='add-note'>
            <h2>Create a note</h2>
            <form onSubmit={e => this.handleNoteSubmit(e)}> 
            <div className='field'>
                <label htmlFor='note-folder-input'>
                  Choose Folder:
                </label>
                <select 
                  type='select' 
                  id='note-folder-input' 
                  value={this.state.folder} 
                  onChange={e => this.addFolderId(e.target.value)}
                  required
                  >
                  <option value=''>Choose Folder:</option>
                  {this.context.folders.map(folder =>
                    <option key={folder.id} value={folder.id}>{folder.title}</option>
                    )}
                </select>
              </div>
              <div className='field'>
                <label htmlFor='note-name-input'>
                  Name
                </label>
                <input 
                  type='text' 
                  id='note-name-input' 
                  value={this.state.note_title} 
                  onChange={e => this.addNoteName(e.target.value)}
                  />
              </div>
              <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
              <div className='field'>
                <label htmlFor='note-content-input'>
                  Content
                </label>
                <textarea id='note-content-input' value={this.state.content} onChange={e => this.addContent(e.target.value)}/>
              </div>
              <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>
             
                <button type='submit' disabled={!this.state.formValid}>
                  Add note
                </button>
            </form>
          </section>

         ) 
        }
    }

    export default NoteAddForm