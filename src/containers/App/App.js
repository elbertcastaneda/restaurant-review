import React, { Component } from 'react';

import AppComponent from '../../components/App';
import RestaurantsMap from '../../components/RestaurantsMap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    fetch('/restaurant-review/api/restaurants.json')
      .then(r => r.json())
      .then(restaurants => this.setState({ restaurants }));
  }

  renderMap() {
    const { restaurants } = this.state;
    return <RestaurantsMap restaurants={restaurants} />;
  }

  render() {
    const map = this.renderMap();
    return <AppComponent leftSide={map} rightSide={<span>Hello</span>} />;
  }
}
