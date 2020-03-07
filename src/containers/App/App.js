import React, { Component } from 'react';

import AppComponent from '../../components/App';
import RestaurantsMap from '../../components/RestaurantsMap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // restaurants: []
    };
  }

  handleChangeRestaurants = restaurants => {
    // eslint-disable-next-line no-console
    console.log(restaurants);
    // this.setState({ restaurants });
  };

  renderMap() {
    return <RestaurantsMap changeRestaurants={this.handleChangeRestaurants} />;
  }

  render() {
    const map = this.renderMap();
    return <AppComponent leftSide={map} rightSide={<span>Hello</span>} />;
  }
}
