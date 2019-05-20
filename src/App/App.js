import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import Notes from '../Notes/Notes'
import Folders from '../Folders/Folders';
import FolderAddForm from '../FolderAddForm/FolderAddForm';
import NoteAddForm from '../NoteAddFormat/NoteAddForm';
import './App.css'
import NoteMain from '../NoteMain/NoteMain';
import NotefulContext from '../NotefulContext'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'



class App extends Component {
  
  state = {
    folders: [],
    notes: [],

  };

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:8000/folders'),
      fetch('http://localhost:8000/notes'),


    ])
      .then(([folderRes, noteRes]) => {
        if(!folderRes.ok)
          return folderRes.json().then(e => Promise.reject(e))
        if(!noteRes.ok) 
          return noteRes.json().then(e => Promise.reject(e))

        return Promise.all([
          folderRes.json(),
          noteRes.json(),
        ])
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
        })
        this.setState({
          notes,
        })
      })
      
      .catch(error => {
        console.error({error})
      })
    }

    handleDeleteNote= noteId => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    }

    handleAddFolder = folder => {
      this.setState({
        folders: 
        [...this.state.folders, folder]
      })
    }

    handleAddNote = note => {
      this.setState({
        notes: 
        [...this.state.notes, note]
      })
    }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      
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
          <Switch>
            <ErrorBoundary>
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
                      path='/notes/:noteId'      
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
            </ErrorBoundary>
          </Switch>
        </main>
      </div>
    </NotefulContext.Provider>

    );
  }
}

export default App;