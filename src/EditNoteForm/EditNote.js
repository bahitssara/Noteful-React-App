import React from 'react'
import NotefulContext from '../NotefulContext'
import './EditNote.css'
import { Link } from 'react-router-dom'
import ValidationError from '../ValidationError/ValidationError'


class NoteEditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: '',
      folder: '',
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

  componentDidMount() {
    const { noteId } = this.props.match.params
    fetch(`http://localhost:8000/notes/${noteId}`,{
      method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          folder: responseData.folder,
          note_title: responseData.note_title,
          content: responseData.content,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }


  editContent(content) {
    this.setState({content}, () => {this.validateContent(content)});
  }

  editNoteName(note_title) {
    this.setState({note_title}, () => {this.validateName(note_title)});
  }

  editFolderId(folder) {
    this.setState({
      folder
    })
  }

  editModified(date_published) {
    this.setState({
      date_published
    })
  }

  handleNoteEdit = e => {
    e.preventDefault();
    const note = (({content, folder, id, date_published, note_title}) => ({content, folder, id, date_published, note_title}))(this.state);
    const { noteId } = this.props.match.params
    fetch(`http://localhost:8000/notes/${noteId}`,{
        method: 'PATCH',
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
                folder: '',
                date_published: new Date(),
                id: '',
                note_title: '',
            });
            this.context.handleEditNote(note);
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
        <div>
          <Link to='/' id='go-back'><i className="fas fa-arrow-left"> Go back</i></Link>
          <section className='add-note'>
            <h2>Edit a note</h2>
            <form onSubmit={e => this.handleNoteEdit(e)}> 
              <div className='field'>
                <label htmlFor='note-name-input'>
                  Name
                </label>
                <input 
                  type='text' 
                  id='note-name-input' 
                  value={this.state.note_title} 
                  onChange={e => this.editNoteName(e.target.value)}
                  />
              </div>
              <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
              <div className='field'>
                <label htmlFor='note-content-input'>
                  Content
                </label>
                <textarea id='note-content-input' value={this.state.content} onChange={e => this.editContent(e.target.value)}/>
              </div>
              <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>
             
                <button type='submit' disabled={!this.state.formValid}>
                  Edit note
                </button>
            </form>
          </section>
        </div>
         ) 
        }
    }

    export default NoteEditForm