import React from 'react';

import styled from './App.styled';

function App() {
  return (
    <styled.Root>
      <styled.Header>
        <styled.Title>Hello world</styled.Title>
        <styled.AppLogo />
        <p>
          Edit <code>src/App</code> and save to reload.
        </p>
        <styled.AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <styled.Wrapper>Learn React</styled.Wrapper>
        </styled.AppLink>
      </styled.Header>
    </styled.Root>
  );
}

export default App;
