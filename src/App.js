import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import './dummyStore'
import Notes from './Notes/Notes'
import Folders from './Folders/Folders';
import FolderAddForm from './FolderAddForm/FolderAddForm';
import NoteAddForm from './NoteAddFormat/NoteAddForm';
import './App.css'
import NoteMain from './NoteMain/NoteMain';
import NotefulContext from './NotefulContext'



class App extends Component {

  state = {
    displayedNotes: [],
    folders: [],
  };

  componentDidMount() {
    debugger
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders'),

    ])
      .then(([noteRes, folderRes]) => {
        if(!folderRes.ok)
          return folderRes.json().then(e => Promise.reject(e))
        if(!noteRes.ok) 
          return noteRes.json().then(e => Promise.reject(e))

        return Promise.all([
          noteRes.json(),
          folderRes.json(),
        ])
      })
      .then(([displayedNotes,folders]) => {
        this.setState({folders})
        this.setState({displayedNotes})

        console.log({displayedNotes, folders})
      })
      .catch(error => {
        console.error({error})
      })

    }

  render() {
    const contextValue = {
      displayedNotes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
    }


    return (
      <NotefulContext.Provider value={contextValue}>
      <div className="App">
        <header className='app-header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main className='main-app'>
            <Route 
                exact
                path='/'  
                component={Folders}
              />
              <Route
                exact
                path='/'
                component={Notes}
              />

              <Route  
                path='/folder-content'
                component={Folders}
              />

              <Route
                path='/folder-content/:clickedFolder'
                component={Notes} 
              />
             
              <Route
                exact
                path='/note/:noteId'      
                component={NoteMain}
              />

              <Route 
                path='/add-folder' 
                exact 
                component={FolderAddForm}
              />
                <Route 
                path='/add-note' 
                exact 
                component={NoteAddForm}
              />

          </main>
      </div>
    </NotefulContext.Provider>

    );
  }
}

export default App;