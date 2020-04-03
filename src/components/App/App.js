import React from 'react';

import PropTypes from 'prop-types';

import s from './App.styled';

function App({ leftSide, rightSide, filterSpace }) {
  return (
    <s.Root>
      <s.Header>
        <s.AppLogo />
        <p>Restaurant review.</p>
        <div style={{ float: 'right', marginRight: '20px', marginTop: '-10px' }}>{filterSpace}</div>
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
  rightSide: PropTypes.node.isRequired,
  filterSpace: PropTypes.node.isRequired,
};

export default App;
