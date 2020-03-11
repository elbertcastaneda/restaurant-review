import styled from 'styled-components';

const MapContainer = styled.div`
  height: 100%;
`;

const GettingCurrentPosition = styled.div`
  color: gray;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
`;

export default {
  MapContainer,
  GettingCurrentPosition
};
