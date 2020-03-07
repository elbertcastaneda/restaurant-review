import React, { Component } from 'react';

import s from './Map.styled';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
  }

  componentDidMount() {
    const {
      google: {
        maps: {
          places: { PlacesService },
          Map: GoogleMap
        }
      }
    } = window;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        this.map = new GoogleMap(this.mapRef.current, {
          center: { lat, lng },
          zoom: 8
        });

        const places = new PlacesService(this.map);
        places.nearbySearch(
          {
            location: {
              lat,
              lng
            },
            type: 'restaurant',
            radius: 7000
          },
          restaurants => {
            // eslint-disable-next-line no-console
            console.log(restaurants);
          }
        );
      });
    }
  }

  render() {
    return (
      <>
        <s.MapContainer ref={this.mapRef} />
      </>
    );
  }
}
