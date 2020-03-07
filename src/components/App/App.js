import React from 'react';

import PropTypes from 'prop-types';

import cs from '../Components.styled';

import s from './App.styled';

function App({ leftSide, rightSide }) {
  return (
    <s.Root>
      <s.Header>
        <s.AppLogo />
        <p>
          Edit <cs.Code>src/App</cs.Code> and save to reload.
        </p>
        <s.AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </s.AppLink>
      </s.Header>
      <s.Body>
        <s.SectionLeft>{leftSide}</s.SectionLeft>
        <s.SectionRight>{rightSide}</s.SectionRight>
      </s.Body>
    </s.Root>
  );
}

App.propTypes = {
  leftSide: PropTypes.node.isRequired,
  rightSide: PropTypes.node.isRequired
};

export default App;
