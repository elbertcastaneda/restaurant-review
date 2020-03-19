import React, { Component } from 'react';

import AppComponent from '../../components/App';
import RestaurantsList from '../../components/RestaurantsList';
import RestaurantsMap from '../../components/RestaurantsMap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selectedRestaurant: null
    };
  }

  handleMapLoaded = (map, { lat, lng }) => {
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: '3000',
      type: ['restaurant']
    };

    const service = new window.google.maps.places.PlacesService(map);
    // eslint-disable-next-line no-console
    service.nearbySearch(request, places => {
      this.setState({
        restaurants: places.map(place => {
          const {
            id,
            name: restaurantName,
            vicinity: address,
            geometry: { location },
            rating
          } = place;

          return {
            id,
            restaurantName,
            address,
            position: {
              lat: location.lat(),
              lng: location.lng()
            },
            rating,
            rates: []
          };
        })
      });
    });
  };

  handleClickRestaurant = selectedRestaurant => {
    this.setState({ selectedRestaurant });
  };

  renderMap() {
    const { restaurants, selectedRestaurant } = this.state;
    return (
      <RestaurantsMap
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        onMapLoaded={this.handleMapLoaded}
      />
    );
  }

  renderList() {
    const { restaurants, selectedRestaurant } = this.state;
    return (
      <>
        <RestaurantsList
          className={selectedRestaurant ? '' : 'selected'}
          restaurants={restaurants}
          onClickRestaurant={this.handleClickRestaurant}
        />
        <div className={selectedRestaurant ? 'selected' : ''}>
          <button type="button" onClick={() => this.setState({ selectedRestaurant: null })}>
            Form
          </button>
        </div>
      </>
    );
  }

  render() {
    const map = this.renderMap();
    const list = this.renderList();
    return <AppComponent leftSide={map} rightSide={list} />;
  }
}
