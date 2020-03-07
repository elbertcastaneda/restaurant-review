import styled from 'styled-components';

import logo from './logo.svg';

const Root = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLogo = styled.img.attrs({
  src: logo,
  alt: 'logo'
})`
  height: 40vmin;
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

const AppLink = styled.a`
  color: #61dafb;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default { Root, Header, AppLogo, Title, AppLink, Wrapper };
