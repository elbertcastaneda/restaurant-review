import React, { Component } from 'react';

import PropTypes from 'prop-types';
import StarRating from 'react-svg-star-rating';

import s from './RestaurantsList.styled';

import fixHalf from '../../utils/fixHalf';

export default class RestaurantList extends Component {
  renderRestaurants() {
    const { filterRating, restaurants, onClickRestaurant, onClickRestaurantRate } = this.props;
    return restaurants
      .filter((r) => Math.round(r.rating).toString() === filterRating || filterRating === '0')
      .map((restaurant) => {
        const { id, restaurantName, position, rating } = restaurant;
        const showRatingsButton = restaurant.rates.length ? (
          <s.ButtonReviews
            onClick={() => {
              onClickRestaurant(restaurant);
            }}
          >
            View Reviews ({restaurant.rates.length})
          </s.ButtonReviews>
        ) : null;

        return (
          <s.Card
            key={id}
            imageSrc={`https://maps.googleapis.com/maps/api/streetview?size=300x300&location=${position.lat},${position.lng}&fov=80&heading=70&pitch=0&key=AIzaSyBwYHIy3nSGNk4Tm-HfoXQpOHbGEyA-RmA`}
          >
            <span title={rating ? rating.toFixed(2) : ''}>
              <StarRating
                initialRating={fixHalf(Number(rating))}
                isHalfRating
                size={20}
                handleOnClick={(selectedRating) => {
                  const modifiedRestaurant = Object.assign(restaurant);
                  modifiedRestaurant.newRate = {
                    comment: '',
                    rating: selectedRating,
                  };
                  onClickRestaurantRate(restaurant);
                }}
              />
            </span>
            {showRatingsButton}
            <div>{restaurantName}</div>
          </s.Card>
        );
      });
  }

  render() {
    const { className } = this.props;
    const restaurants = this.renderRestaurants();
    return <s.List className={className}>{restaurants}</s.List>;
  }
}

RestaurantList.propTypes = {
  className: PropTypes.string.isRequired,
  filterRating: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      restaurantName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickRestaurant: PropTypes.func.isRequired,
  onClickRestaurantRate: PropTypes.func.isRequired,
};
