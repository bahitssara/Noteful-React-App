import React from 'react'
import NotefulContext from '../NotefulContext'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'
import './EditFolder.css'

class FolderEditForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            title: '',
            nameValid: false,
            formValid: false,
            validationMessage: {
                title: '',
            }
        };
    }

    static contextType = NotefulContext;

    componentDidMount() {
        const { folderId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/folders/${folderId}`,{
          method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
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
              title: responseData.title
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }

    editFolderName(title) {
        this.setState({title}, () => {this.validateName(title)});
    }

    handleFolderEdit = e => {
        e.preventDefault();
        const folderId = this.props.match.params
        const folder = (({id, title}) => ({id, title}))(this.state);
        fetch(config.API_ENDPOINT + `/folders/${folderId}`,{
        method: 'PATCH',
        body:JSON.stringify(folder),
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
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
                id: '',
                title: '',
            });
            this.context.editFolder(folder);
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
            fieldErrors.title = 'Folder name is required';
            hasError = true;
        } else {
            if(fieldValue.length < 3) {
                fieldErrors.title = 'Folder name must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.title = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessage: fieldErrors,
            nameValid: !hasError
        }, this.formValid);
    }

    formValid(){
        this.setState({
            formValid: this.state.nameValid
        });
    }

    render() {
        return(
            <div>
                <section className='add-folder' onSubmit={e => this.handleFolderEdit(e)}>
                    <h2>New Folder</h2>
                    <form>
                        <label htmlFor='add-folder-input'>
                            Folder Name
                        </label>
                            <input type='text' id='add-folder-input' value={this.state.title} onChange={e => this.editFolderName(e.target.value)}/>
                                <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessage.title}/>
                        <button type='submit' disabled={!this.state.formValid}>
                            Edit
                        </button>
                    </form>
                </section>
            </div>
        )
    }
}

export default FolderEditForm