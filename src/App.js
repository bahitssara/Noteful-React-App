import React, { Component } from 'react';
import './dummyStore'
import dummyStore from './dummyStore';
import Notes from './Notes/Notes'


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
            <a href=''>Noteful</a>
          </h1>
        </header>
        <main className='main-app'>
        <Notes notes={this.state.notes}/>
        </main>
       
      </div>
    );
  }
}

export default App;
