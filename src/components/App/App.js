import React from 'react';

import cs from '../Components.styled';

import s from './App.styled';

function App() {
  return (
    <s.Root>
      <s.Header>
        <s.Title>Hello world</s.Title>
        <s.AppLogo />
        <p>
          Edit <cs.Code>src/App</cs.Code> and save to reload.
        </p>
        <s.AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <s.Wrapper>Learn React</s.Wrapper>
        </s.AppLink>
      </s.Header>
    </s.Root>
  );
}

export default App;
