import React from 'react';
import styled from '@emotion/styled';
import svgHostgatorLogo from './images/hostgator-logo.svg';
import svgIconCheck from './images/icon-check.svg';
import svgBtnDown from './images/btn-down.svg';
import svgLeft from './images/left-image.svg';
import svgRight from './images/right-image.svg';
import mq from './mq';

const Logo = styled.div`
  margin-top: 8px;
  margin-left: 15px;
  width: 198px;
  height: 35px;
  background: transparent url('${svgHostgatorLogo}') 0% 0% no-repeat padding-box;

  ${mq.desktop} {
    margin-left: 400px;
  }
`;

const BlueBox = styled.div`
  background-color: #1d5297;
  position: relative;

  ${mq.desktop} {
    min-height: 300px;
  }
`;

const Title = styled.p`
  font: SemiBold 16px/27px Montserrat;
  padding-top: 30px;
  text-align: center;
  letter-spacing: 1.6px;
  color: #b9d0ef;

  ${mq.tablet} {
    padding-top: 60px;
  }
`;

const Content = styled.p`
  font: Bold 24px/32px Montserrat;
  text-align: center;
  padding: 0 10px;
  letter-spacing: 0px;
  color: #ffffff;

  ${mq.tablet} {
    position: relative;
    max-width: 600px;
    left: calc(50% - 300px);
  }
`;

const Features = styled.div`
  padding-bottom: 30px;

  p {
    font: Regular 16px/20px Montserrat;
    letter-spacing: 0px;
    color: #b9d0ef;
    text-align:center;
    background: url('${svgIconCheck}') no-repeat left top;
    margin: 10px 30px 10px 50px;
    padding-left: 24px;
  }

  ${mq.tablet} {
    text-align:center;

    p {
      display: inline;
      margin: 10px;
    }

    p:first-child::after {
      content: "\\A";
      white-space: pre;
      color:red;
    }
  }
`;

const ButtonDown = styled.div`
  background: url('${svgBtnDown}') no-repeat;
  position: absolute;
  left: calc(50% - 23px);
  top: calc(100% - 23px);
  width: 52px;
  height: 52px;
`;

const LeftPane = styled.div`
  display: none;
  background: url('${svgLeft}') no-repeat;
  background-size: contain;
  width: calc(484px * 1);
  height: calc(353px * 1);
  position: absolute;
  top: 30px;
  left: 69px;

  ${mq.desktop} {
    display: block;
  }
`;

const RightPane = styled.div`
  display: none;
  background: url('${svgRight}') no-repeat;
  background-size: contain;
  width: calc(438px / 1);
  height: calc(346px / 1);
  position: absolute;
  top: 30px;
  right: 69px;

  ${mq.desktop} {
    display: block;
  }
`;

const CenterPane = styled.div``;

const Header = () => (
  <div>
    <Logo />
    <BlueBox>
      <LeftPane />
      <CenterPane>
        <Title>Hospedagem de Sites</Title>
        <Content>
          Tenha uma hospedagem de sites estável e evite perder visitantes
          diariamente
        </Content>
        <Features>
          <p>99,9% de disponibilidade: seu site sempre no ar</p>
          <p>Suporte 24h, todos os dias</p>
          <p>Painel de Controle cPanel</p>
        </Features>
        <ButtonDown />
      </CenterPane>
      <RightPane />
    </BlueBox>
  </div>
);

export default Header;
