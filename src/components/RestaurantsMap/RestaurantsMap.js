import React, { Component } from 'react';

import PropTypes from 'prop-types';

import s from './RestaurantsMap.styled';

export default class RestaurantsMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
    this.placesService = null;
    this.placesResultPaginator = null;
    this.restaurantMarkers = new Map();
  }

  componentDidMount() {
    const { changeRestaurants } = this.props;
    const {
      google: {
        maps: {
          Animation,
          Marker,
          places: { PlacesService },
          Map: GoogleMap
        }
      }
    } = window;

    this.map = new GoogleMap(this.mapRef.current, {
      center: { lat: 20.6995456, lng: -103.35027199999999 },
      zoom: 12
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const location = {
          lat,
          lng
        };
        setTimeout(() => {
          const myPosMarker = new Marker({
            map: this.map,
            position: location,
            animation: Animation.DROP,
            title: 'My position'
          });
          myPosMarker.addListener('click', function myPositionMarkerClick() {
            this.map.setZoom(13);
            this.map.setCenter(this.getPosition());
          });
        }, 400);

        this.map.setCenter(location);

        this.placesService = new PlacesService(this.map);
        this.placesService.nearbySearch(
          {
            location,
            type: 'restaurant',
            radius: 9000
          },
          (restaurants, status, paginator) => {
            if (status !== 'OK') return;
            this.placesResultPaginator = paginator;

            this.createMarkers(restaurants);
            changeRestaurants(restaurants, paginator);
          }
        );
      });
    }
  }

  createMarkers = (places = []) => {
    const { map } = this;
    const {
      google: {
        maps: { LatLngBounds, Point, Size, Marker, Animation }
      }
    } = window;
    const bounds = new LatLngBounds();

    places.forEach((place, iPlace) => {
      const image = {
        url: place.icon,
        size: new Size(64, 64),
        origin: new Point(0, 0),
        anchor: new Point(17, 34),
        scaledSize: new Size(25, 25)
      };

      // eslint-disable-next-line no-unused-expressions
      setTimeout(() => {
        const marker = new Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
          animation: Animation.DROP
        });
        marker.addListener('click', function restaurantMarkerClick() {
          this.map.setZoom(13);
          this.map.setCenter(this.getPosition());
        });

        this.restaurantMarkers.set(place.id, { ...place, marker });
      }, 600 + 20 * iPlace);

      bounds.extend(place.geometry.location);
    });
    map.fitBounds(bounds);
  };

  render() {
    return (
      <>
        <s.MapContainer ref={this.mapRef} />
      </>
    );
  }
}

RestaurantsMap.propTypes = {
  changeRestaurants: PropTypes.func.isRequired
};
