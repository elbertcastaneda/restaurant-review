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
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5px;
`;

const CardBody = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  border: none;
  font: inherit;
  width: 250px;
  min-height: 50px;

  padding: 5px;

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
  }
`;

const ButtonReviews = styled.button.attrs({ type: 'button' })`
  background-color: #0074d9;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  color: white;
  font-weight: bold;
  overflow: hidden;
  border: none;
  padding: 7px;

  &::after {
    clear: both;
  }
  &::after,
  &::before {
    content: '';
    display: block;
  }

  &:focus {
    background-color: #7fdbff;
  }

  &:hover {
    background-color: #7fdbff;
    cursor: pointer;
  }
`;

const Image = styled.img`
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: calc(100% - 5px);
  height: 150px;
`;

const Card = React.forwardRef(({ onClick, children, imageSrc }, ref) => (
  <Item>
    <CardBody onClick={onClick} ref={ref}>
      <Image src={imageSrc} />
      {children}
    </CardBody>
  </Item>
));

Card.displayName = 'RestaurantsListCard';

Card.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  imageSrc: PropTypes.string.isRequired,
};

Card.defaultProps = {
  onClick: () => {},
};

export default {
  List,
  Card,
  ButtonReviews,
};
