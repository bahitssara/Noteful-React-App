import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './dummyStore'
import dummyStore from './dummyStore';
import Notes from './Notes/Notes'
import Folders from './Folders/Folders';



class App extends Component {

  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }


  render() {
    console.log(this.state.notes)

    return (
      <div className="App">
        <nav className='nav-app'>
          NAV ROUTES
        </nav>
        <header className='app-header'>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main className='main-app'>
        <Folders folders={this.state.folders}/>
        <Notes notes={this.state.notes}/>
        
        </main>
       
      </div>
    );
  }
}

export default App;
