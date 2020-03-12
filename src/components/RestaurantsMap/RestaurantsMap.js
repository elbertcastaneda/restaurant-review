import React, { Component } from 'react';

import PropTypes from 'prop-types';

import s from './RestaurantsMap.styled';

export default class RestaurantsMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
    this.restaurantMarkers = new Map();
    this.state = {
      gettingCurrentPosition: false
    };
  }

  componentDidMount() {
    const {
      google: {
        maps: { Map: GoogleMap }
      }
    } = window;

    this.map = new GoogleMap(this.mapRef.current, {
      center: { lat: 20.6995456, lng: -103.35027199999999 },
      zoom: 13
    });

    this.updateCurrentPositionMarker();
    this.updateRestaurantMarkers();
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { restaurants, selectedRestaurant } = this.props;

    if (prevProps.restaurants !== restaurants) {
      return { updateRestaurants: true };
    }

    if (prevProps.selectedRestaurant !== selectedRestaurant && selectedRestaurant) {
      return { updateSelectedRestaurant: true };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // eslint-disable-next-line no-console
    console.log('trying updating');
    if (snapshot && snapshot.updateRestaurants) {
      // eslint-disable-next-line no-console
      console.log('updating');
      this.updateRestaurantMarkers();
    }

    if (snapshot && snapshot.updateSelectedRestaurant) {
      const {
        selectedRestaurant: { id }
      } = this.props;
      const {
        google: {
          maps: {
            event: { trigger }
          }
        }
      } = window;
      // eslint-disable-next-line no-console
      console.log('updating selected restaurant', this.restaurantMarkers.get(id).marker);

      trigger(this.restaurantMarkers.get(id).marker, 'click');
    }
  }

  updateCurrentPositionMarker = () => {
    const { map } = this;
    const {
      google: {
        maps: { Animation, Marker }
      }
    } = window;

    if (navigator.geolocation) {
      this.setState({ gettingCurrentPosition: true });
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const position = {
          lat,
          lng
        };
        setTimeout(() => {
          this.setState({ gettingCurrentPosition: false });
          const currentPositionMarker = new Marker({
            map,
            position,
            animation: Animation.DROP,
            title: 'Your position'
          });
          currentPositionMarker.addListener('click', function currentPositionMarkerClick() {
            map.setZoom(13);
            map.setCenter(this.getPosition());
          });
        }, 400);

        map.setCenter(position);
      });
    }
  };

  updateRestaurantMarkers = () => {
    const {
      map,
      restaurantMarkers,
      props: { restaurants }
    } = this;
    const {
      google: {
        maps: { Point, Size, Marker, Animation, InfoWindow }
      }
    } = window;

    restaurants
      .filter(p => !Array.from(restaurantMarkers.keys()).includes(p.id))
      .forEach((restaurant, iPlace) => {
        const { id, restaurantName, position } = restaurant;
        const image = {
          url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
          size: new Size(64, 64),
          origin: new Point(0, 0),
          anchor: new Point(17, 34),
          scaledSize: new Size(25, 25)
        };

        setTimeout(() => {
          const marker = new Marker({
            map,
            position,
            icon: image,
            title: restaurantName,
            animation: Animation.DROP
          });
          const contentString = `<img
              src="https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${position.lat},${position.lng}&fov=80&heading=70&pitch=0&key=AIzaSyBwYHIy3nSGNk4Tm-HfoXQpOHbGEyA-RmA"
              alt=""
            />
          `;

          const infoWindow = new InfoWindow({
            content: contentString
          });

          marker.addListener('click', function restaurantMarkerClick() {
            this.map.setZoom(13);
            this.map.setCenter(this.getPosition());
            Array.from(restaurantMarkers.values())
              .filter(r => r.id !== id)
              .forEach(({ infoWindow: iw }) => iw.close());
            setTimeout(() => {
              infoWindow.open(this.map, marker);
            }, 1000);
          });

          restaurantMarkers.set(id, { ...restaurant, marker, infoWindow });
        }, 600 + 20 * iPlace);
      });
  };

  renderGettingCurrentPositionIndicator() {
    const { gettingCurrentPosition } = this.state;
    if (gettingCurrentPosition) {
      return (
        <s.GettingCurrentPosition>
          Getting current location from your device&nbsp;...
        </s.GettingCurrentPosition>
      );
    }

    return null;
  }

  render() {
    const gettingCurrentPositionIndicator = this.renderGettingCurrentPositionIndicator();
    return (
      <>
        {gettingCurrentPositionIndicator}
        <s.MapContainer ref={this.mapRef} />
      </>
    );
  }
}

const restaurantShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
});

RestaurantsMap.propTypes = {
  restaurants: PropTypes.arrayOf(restaurantShape).isRequired,
  selectedRestaurant: restaurantShape
};

RestaurantsMap.defaultProps = {
  selectedRestaurant: null
};
