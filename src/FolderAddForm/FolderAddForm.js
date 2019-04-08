import React from 'react'
import NotefulContext from '../NotefulContext'

class FolderAddForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:'',
            name: '',
        };
    }

    static contextType = NotefulContext;

    addFolderName(name) {
        this.setState({
            name
        });
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
        })
        .catch(error => {
            console.error({error})
        })
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
                    <button type='submit'>
                        Add 
                    </button>
                </form>
            </section>

        )
    }
}

export default FolderAddForm