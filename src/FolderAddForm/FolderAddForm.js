import React from 'react'
import NotefulContext from '../NotefulContext'
import ValidationError from '../ValidationError/ValidationError'

class FolderAddForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            name: '',
            nameValid: false,
            formValid: false,
            validationMessage: {
                name: '',
            }
        };
    }

    static contextType = NotefulContext;

    addFolderName(name) {
        this.setState({name}, () => {this.validateName(name)});
    }


    handleFolderSubmit = e => {
        e.preventDefault();
        const folder = (({id, name}) => ({id, name}))(this.state);
        fetch(`http://localhost:9090/folders`,{
        method: 'POST',
        body:JSON.stringify(folder),
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
                id: '',
                name: '',
            });
            this.context.addFolder(folder);
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
            fieldErrors.name = 'Folder name is required';
            hasError = true;
        } else {
            if(fieldValue.length < 3) {
                fieldErrors.name = 'Folder name must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.name = '';
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
            <section className='add-folder' onSubmit={e => this.handleFolderSubmit(e)}>
                <h2>New Folder</h2>
                <form>
                    <label htmlFor='add-folder-input'>
                        Folder Name
                    </label>
                    <input type='text' id='add-folder-input' value={this.state.name} onChange={e => this.addFolderName(e.target.value)}/>
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessage.name}/>
                    <button type='submit' disabled={!this.state.formValid}>
                        Add 
                    </button>
                </form>
            </section>

        )
    }
}

export default FolderAddForm