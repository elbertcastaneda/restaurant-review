import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 15px 0 0 0;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Item = styled.li`
  list-style: none;
  width: 100%;
  margin: 0 0 10px 0;
`;

const Button = styled.button.attrs({ type: 'button' })`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  border: none;
  font: inherit;
  width: calc(100% - 20px);
  min-height: 50px;
  &::after {
    clear: both;
  }
  &::after,
  &::before {
    content: '';
    display: block;
  }

  &:focus {
    background-color: gray;
  }

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const Card = React.forwardRef(({ onClick, children }, ref) => (
  <Item>
    <Button onClick={onClick} forwardedRef={ref}>
      {children}
    </Button>
  </Item>
));

Card.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Card.defaultProps = {
  onClick: () => {}
};

export default {
  List,
  Card
};
