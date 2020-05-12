import React from 'react';
import styled from '@emotion/styled';
import svgHostgatorLogo from './images/hostgator-logo.svg';
import svgIconCheck from './images/icon-check.svg';
import svgBtnDown from './images/btn-down.svg';

const Logo = styled.div`
  margin-top: 8px;
  margin-left: 15px;
  width: 198px;
  height: 35px;
  background: transparent url('${svgHostgatorLogo}') 0% 0% no-repeat padding-box;
`;

const BlueBox = styled.div`
  background-color: #1d5297;
  position: relative;
`;

const Title = styled.p`
  font: SemiBold 16px/27px Montserrat;
  padding-top: 30px;
  text-align: center;
  letter-spacing: 1.6px;
  color: #b9d0ef;
`;

const Content = styled.p`
  font: Bold 24px/32px Montserrat;
  text-align: center;
  padding: 0 10px;
  letter-spacing: 0px;
  color: #ffffff;
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
`;

const ButtonDown = styled.div`
  background: url('${svgBtnDown}') no-repeat;
  position: absolute;
  left: calc(50% - 23px);
  top: calc(100% - 23px);
  width: 52px;
  height: 52px;
`;

const Header = () => (
  <div>
    <Logo />
    <BlueBox>
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
    </BlueBox>
  </div>
);

export default Header;
