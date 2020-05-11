import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getName, setName } from './redux/modules/product';
import logo from './logo.svg';
import './App.css';

function App() {
  const name = useSelector(getName);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Name is {name}</p>
        <p>
          <button type="button" onClick={(e) => dispatch(setName('Foo'))}>
            Click here
          </button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
