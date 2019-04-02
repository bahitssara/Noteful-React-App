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



class App extends Component {

  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    this.setState(dummyStore)
  }


  render() {
    console.log(this.state.notes)

    return (
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
            render={() => {
              return (
                <>
                  <Folders folders={this.state.folders}/>
                  <Notes notes={this.state.notes}/>
                </>
                )
              }
            }
          />
          <Route
            path='/folder-content/:clickedFolder'
            render={({ match }) => {
              const displayNotes = this.state.notes.filter(note => {
               return note.folderId === match.params.clickedFolder
              })
              return(
                <>
                  <Folders folders={this.state.folders}/>
                  <Notes 
                  notes={ displayNotes }
                />
                </>
              )
            }}
        />
          
          <Route
            exact
            path='/note/:noteId'      
            render={({ match }) => {
              const findNote = this.state.notes.find(note => {
                return note.id === match.params.noteId
              })
              return (
                <NoteMain 
                  note={ findNote }
                  folders={this.state.folders}
                />
              )
            }      
          }
        />

        <Route 
            path='/add-folder' exact 
            component={FolderAddForm}/>
          <Route 
            path='/add-note' exact 
            component={NoteAddForm} />

        
        </main>
       
      </div>
    );
  }
}

export default App;