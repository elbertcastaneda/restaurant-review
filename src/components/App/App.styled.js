import React from 'react';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import logo from './logo.svg';

const Root = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: calc(8px + 2vmin);
  color: white;
`;

const AppLogo = styled.img.attrs({
  src: logo,
  alt: 'logo',
})`
  height: 48px;
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
      animation: App-logo-spin infinite 4s linear;
    }
  }
`;

const Header = styled.header`
  width: 100%;
  background: #00b4db; /* fallback for old browsers */
  background: linear-gradient(to right, #00b4db, #0083b0);
  height: calc(15vh - 10px);
  padding-top: 10px;
  p {
    margin: 5px 0px;
  }
`;

const Body = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const SectionLeft = styled.section`
  background-color: orange;
  width: 80%;
  height: 85vh;
  overflow-x: hidden;
  position: relative;
`;

const SectionRightWrapper = styled.section`
  background: #3c3b3f; /* fallback for old browsers */
  background: linear-gradient(to right, #605c3c, #3c3b3f);
  width: 20%;
  min-width: 300px;
  height: 85vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const SlideContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  > * {
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    visibility: hidden;
    opacity: 0;
    width: 0;

    &.selected {
      visibility: visible;
      opacity: 1;
      width: 100%;
      margin-left: 0px;
      overflow-y: inherit;
    }

    &:first-child:not(.selected) {
      width: 100%;
      margin-left: -100%;
      opacity: 0;
      overflow-y: hidden;
    }
  }
`;

const SectionRight = React.forwardRef(({ children }, ref) => (
  <SectionRightWrapper>
    <SlideContent ref={ref}>{children}</SlideContent>
  </SectionRightWrapper>
));

SectionRight.displayName = 'SectionRight';

SectionRight.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default { Root, AppLogo, Header, Body, SectionLeft, SectionRight };
