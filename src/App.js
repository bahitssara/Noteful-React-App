import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import './dummyStore'
import dummyStore from './dummyStore';
import Notes from './Notes/Notes'
import Folders from './Folders/Folders';
import FolderAddForm from './FolderAddForm/FolderAddForm';
import NoteAddForm from './NoteAddFormat/NoteAddForm';
import './App.css'
import NoteMain from './NoteMain/NoteMain';
import NotefulContext from './NotefulContext'



class App extends Component {

  state = {
    notes: [],
    folders: [],
  };


  componentDidMount() {
    this.setState(dummyStore)
  }


  render() {
    const contextValue = {
      displayedNotes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
    }

    console.log(this.deleteNote, this.deleteFolder)

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
                path='/'  
                component={Folders}
              />
              <Route
                exact
                path='/'
                component={Notes}
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
                path='/add-folder' exact 
                component={FolderAddForm}/>
              <Route 
                path='/add-note' exact 
                component={NoteAddForm} />

          </main>
      </div>
    </NotefulContext.Provider>

    );
  }
}

export default App;