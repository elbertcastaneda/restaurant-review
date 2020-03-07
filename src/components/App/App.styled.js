import styled from 'styled-components';

import logo from './logo.svg';

const Root = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

const AppLogo = styled.img.attrs({
  src: logo,
  alt: 'logo'
})`
  height: 64px;
  pointer-events: none;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: App-logo-spin infinite 20s linear;
    }
  }
`;

const Header = styled.header`
  width: 100%;
  background-color: #282c34;
  height: 25vh;
`;

const Body = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SectionLeft = styled.section`
  background-color: orange;
  width: 70%;
  height: 75vh;
`;

const SectionRight = styled.section`
  background-color: fuchsia;
  width: 30%;
  height: 75vh;
`;

export default { Root, AppLogo, AppLink, Header, Body, SectionLeft, SectionRight };
