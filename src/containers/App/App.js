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

  componentDidMount() {
    fetch('/restaurant-review/api/restaurants.json')
      .then(r => r.json())
      .then(restaurants => this.setState({ restaurants }));
  }

  handleClickRestaurant = selectedRestaurant => {
    this.setState({ selectedRestaurant });
  };

  renderMap() {
    const { restaurants, selectedRestaurant } = this.state;
    return <RestaurantsMap restaurants={restaurants} selectedRestaurant={selectedRestaurant} />;
  }

  renderList() {
    const { restaurants } = this.state;
    return (
      <RestaurantsList restaurants={restaurants} onClickRestaurant={this.handleClickRestaurant} />
    );
  }

  render() {
    const map = this.renderMap();
    const list = this.renderList();
    return <AppComponent leftSide={map} rightSide={list} />;
  }
}
