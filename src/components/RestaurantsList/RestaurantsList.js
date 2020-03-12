import React, { Component } from 'react';

import PropTypes from 'prop-types';

import s from './RestaurantsList.styled';

export default class RestaurantList extends Component {
  renderRestaurants() {
    const { restaurants, onClickRestaurant } = this.props;
    return restaurants.map(restaurant => (
      <s.Card
        data-id={restaurant.id}
        key={restaurant.id}
        onClick={e => {
          onClickRestaurant(restaurant, e);
        }}
      >
        {restaurant.restaurantName}
      </s.Card>
    ));
  }

  render() {
    const restaurants = this.renderRestaurants();
    return <s.List>{restaurants}</s.List>;
  }
}

RestaurantList.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      restaurantName: PropTypes.string.isRequired
    })
  ).isRequired,
  onClickRestaurant: PropTypes.func.isRequired
};
