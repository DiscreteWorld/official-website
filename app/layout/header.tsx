import {useEffect, useState} from 'react';
import {Links, Meta} from 'remix';
import styled from 'styled-components';
import {GITHUB_REPOSITORY_ADDR} from '~/constants/links';

interface LogoProps {
  isLight: boolean;
}

export interface HeaderProps {}

const Logo = styled.img<LogoProps>`
  transition: all 0.5s;
  filter: ${props => props.isLight && 'drop-shadow( 0 0 2px #71d4f0)'};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  color: white;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkWrapper = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
`;

export const Header = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src="/assets/logo.svg" isLight={false} />
        <LogoText>Discrete world</LogoText>
      </LogoWrapper>
      <LinkWrapper>
        <Link href="#">Blog</Link>
        <Link href={GITHUB_REPOSITORY_ADDR}>GitHub</Link>
      </LinkWrapper>
    </Wrapper>
  );
};
