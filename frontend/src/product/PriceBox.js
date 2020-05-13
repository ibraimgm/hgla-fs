import React from 'react';
import styled from '@emotion/styled';
import svgInfoIcon from '../images/icon-info.svg';

import NumberFormat from 'react-number-format';

const PricePanel = styled.div`
  font: 13px Montserrat;
  color: #333333;

  .priceA {
    text-decoration: line-through;
  }

  .priceB {
    margin-left: 5px;
    font-weight: bold;
  }

  .label {
    display: block;
    margin: 8px 0 12px 0;
  }

  .priceC {
    font: 20px/24px Montserrat;
    letter-spacing: 0px;
    color: #1d5297;

    .value {
      font: Bold 35px/24px Montserrat;
      letter-spacing: 0px;
      color: #1d5297;
    }
  }
`;

const Currency = (props) => (
  <NumberFormat
    displayType="text"
    prefix="R$ "
    thousandSeparator="."
    decimalSeparator=","
    {...props}
  />
);

const BuyNow = styled.a`
  display: inline-block;
  background: #ff6a17 0% 0% no-repeat padding-box;
  border-radius: 26px;
  font: Bold 22px/27px Montserrat;
  color: #ffffff;
  padding: 9px 17px;
  margin: 40px 0;
`;

const FreeDomain = styled.div`
  font: Bold 15px/20px Montserrat;
  color: #333333;
`;

const InfoIcon = styled.div`
  display: inline-block;
  background: url('${svgInfoIcon}') no-repeat padding-box;
  position: relative;
  width: 15px;
  height: 15px;
  left: 4px;
  top: 3px;
`;

const Discount = styled.div`
  font: 14px/18px Montserrat;
  color: #1d5297;
  margin-top: 10px;

  .tag {
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    background: #51c99c 0% 0% no-repeat padding-box;
    border-radius: 224px;
    padding: 3px 6px;
    margin-left: 10px;
  }
`;

const PriceBox = ({ valueA, valueB, valueC, valueD, discount }) => (
  <React.Fragment>
    <PricePanel>
      <Currency className="priceA" value={valueA} />
      <Currency className="priceB" value={valueB} />
      <span className="label">equivalente a</span>
      <div className="priceC">
        R$ <Currency prefix="" className="value" value={valueC} />
        /mês*
      </div>
    </PricePanel>
    <BuyNow>Contrate Agora</BuyNow>
    <FreeDomain>
      1 ano de Domínio Grátis
      <InfoIcon />
    </FreeDomain>
    <Discount>
      economize <Currency value={valueD} />
      <span className="tag">{discount}% off</span>
    </Discount>
  </React.Fragment>
);

export default PriceBox;
