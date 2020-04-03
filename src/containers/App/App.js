import React, { Component } from 'react';

import StarRating from 'react-svg-star-rating';

import AppComponent from '../../components/App';
import RestaurantsList from '../../components/RestaurantsList';
import RestaurantsMap from '../../components/RestaurantsMap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selectedRestaurant: null,
      showReviews: false,
      filterRating: '0',
    };
  }

  handleMapLoaded = (map, { lat, lng }) => {
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: '3000',
      type: ['restaurant'],
    };

    const service = new window.google.maps.places.PlacesService(map);
    // eslint-disable-next-line no-console
    service.nearbySearch(request, (places) => {
      this.setState({
        restaurants: places.map((place) => {
          const {
            id,
            icon,
            name: restaurantName,
            vicinity: address,
            geometry: { location },
            // rating,
            // user_ratings_total: userRatingsTotal
          } = place;

          return {
            id,
            icon,
            restaurantName,
            address,
            position: {
              lat: location.lat(),
              lng: location.lng(),
            },
            rating: 0,
            rates: [],
          };
        }),
      });
    });
  };

  handleClickRestaurant = (selectedRestaurant) => {
    this.setState({ selectedRestaurant, showReviews: true });
  };

  handleClickRestaurantRate = (selectedRestaurant) => {
    this.setState({ selectedRestaurant });
  };

  handleFormReviewSubmit = (e) => {
    const { restaurants, selectedRestaurant } = this.state;
    const idx = restaurants.findIndex((r) => r.id === selectedRestaurant.id);

    e.preventDefault();
    selectedRestaurant.rates.push({ ...selectedRestaurant.newRate });
    delete selectedRestaurant.newRate;
    const ratesLength = selectedRestaurant.rates.length;
    selectedRestaurant.rating =
      selectedRestaurant.rates.reduce((acc, r) => acc + r.rating, 0) / ratesLength;

    if (idx !== -1) {
      selectedRestaurant.id = `${selectedRestaurant.id}.1`;
      restaurants.splice(idx, 1, selectedRestaurant);
    } else {
      selectedRestaurant.id = (restaurants.length + 1).toString();
      restaurants.unshift(selectedRestaurant);

      // eslint-disable-next-line no-unused-expressions
      selectedRestaurant.marker && selectedRestaurant.marker.setMap(null);
    }

    this.setState({ restaurants: [...restaurants], selectedRestaurant: null });
  };

  renderMap() {
    const { restaurants, selectedRestaurant } = this.state;
    return (
      <RestaurantsMap
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        onMapLoaded={this.handleMapLoaded}
        onAddPlace={(marker) => {
          const { position } = marker;
          this.setState({
            selectedRestaurant: {
              id: '0',
              icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
              restaurantName: '',
              address: '',
              position: {
                lat: position.lat(),
                lng: position.lng(),
              },
              rating: 0,
              rates: [],
              newRate: {
                comment: '',
                rating: 0,
              },
              marker,
            },
          });
        }}
      />
    );
  }

  renderFormReviews() {
    const { selectedRestaurant, showReviews } = this.state;
    const rateComponent =
      selectedRestaurant && !showReviews ? (
        <StarRating
          initialRating={selectedRestaurant.newRate.rating}
          isHalfRating
          size={20}
          handleOnClick={(rating) => {
            selectedRestaurant.newRate.rating = rating;
            this.setState({ selectedRestaurant });
          }}
        />
      ) : null;

    const restaurantNameInput =
      selectedRestaurant && selectedRestaurant.id === '0' ? (
        <input
          name="restaurantName"
          placeholder="Write the restaurant name"
          style={{ minWidth: 'calc(100% - 40px)' }}
          onChange={(e) => {
            selectedRestaurant.restaurantName = e.target.value;
            this.setState({ selectedRestaurant });
          }}
          value={selectedRestaurant ? selectedRestaurant.restaurantName : ''}
        />
      ) : null;
    return (
      <form
        className={selectedRestaurant && !showReviews ? 'selected' : ''}
        onSubmit={this.handleFormReviewSubmit}
      >
        {restaurantNameInput}
        {rateComponent}
        <textarea
          name="comment"
          style={{ minWidth: 'calc(100% - 40px)', minHeight: '150px' }}
          placeholder="Write your review"
          onChange={(e) => {
            selectedRestaurant.newRate.comment = e.target.value;
            this.setState({ selectedRestaurant });
          }}
          value={
            selectedRestaurant && selectedRestaurant.newRate
              ? selectedRestaurant.newRate.comment
              : ''
          }
        />
        <button type="submit">Save</button>
      </form>
    );
  }

  renderReviews() {
    const { selectedRestaurant, showReviews } = this.state;
    const rateList =
      selectedRestaurant && showReviews
        ? selectedRestaurant.rates.map((rate) => (
            <div key={`${rate.comment}_${rate.rating}`}>
              <div>{rate.comment}</div>
              <StarRating initialRating={rate.rating} isReadOnly isHalfRating />
              <hr />
            </div>
          ))
        : null;

    return (
      <div className={selectedRestaurant && showReviews ? 'selected' : ''}>
        {rateList}
        <button
          type="button"
          onClick={() => {
            this.setState({ selectedRestaurant: null, showReviews: false });
          }}
        >
          Back
        </button>
      </div>
    );
  }

  renderList() {
    const { restaurants, selectedRestaurant, filterRating } = this.state;
    const restaurantList = (
      <RestaurantsList
        className={selectedRestaurant ? '' : 'selected'}
        filterRating={filterRating}
        restaurants={restaurants}
        onClickRestaurant={this.handleClickRestaurant}
        onClickRestaurantRate={this.handleClickRestaurantRate}
      />
    );

    return (
      <>
        {restaurantList}
        {this.renderFormReviews()}
        {this.renderReviews()}
      </>
    );
  }

  render() {
    const { filterRating } = this.state;
    const map = this.renderMap();
    const list = this.renderList();
    return (
      <AppComponent
        leftSide={map}
        rightSide={list}
        filterSpace={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span>Filter by rating: &nbsp;</span>
            <select
              name="filterRating"
              style={{ width: '150px' }}
              value={filterRating}
              onBlur={(e) => {
                this.setState({ filterRating: e.target.value });
              }}
              onChange={(e) => {
                this.setState({ filterRating: e.target.value });
              }}
            >
              <option value="0">-- All --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        }
      />
    );
  }
}
