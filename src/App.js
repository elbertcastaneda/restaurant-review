import React from 'react';

import styled from 'styled-components';

import './App.css';
import logo from './logo.svg';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>Hello world</Title>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Wrapper>Learn React</Wrapper>
        </a>
      </header>
    </div>
  );
}

export default App;
