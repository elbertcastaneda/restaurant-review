import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class RestaurantList extends Component {
  renderRestaurants() {
    const { restaurants } = this.props;
    return restaurants.map(({ id, id: key, name }) => (
      <li key={key} data-id={id}>
        {name}
      </li>
    ));
  }

  render() {
    const restaurants = this.renderRestaurants();
    return <div>{restaurants}</div>;
  }
}

RestaurantList.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
