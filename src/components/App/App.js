import React from 'react';

import componentsStyled from '../Components.styled';

import styled from './App.styled';

const { Code } = componentsStyled;

function App() {
  return (
    <styled.Root>
      <styled.Header>
        <styled.Title>Hello world</styled.Title>
        <styled.AppLogo />
        <p>
          Edit <Code>src/App</Code> and save to reload.
        </p>
        <styled.AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <styled.Wrapper>Learn React</styled.Wrapper>
        </styled.AppLink>
      </styled.Header>
    </styled.Root>
  );
}

export default App;
