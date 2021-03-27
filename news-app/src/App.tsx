import React, { Component } from "react";
import './App.scss';
import TopNews from './components/TopNews';

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {

  render() {
    return (
      <div className="app">
        <h1>Recent News Items</h1>
          <TopNews />
      </div>
    );
  }
}

export default App;
