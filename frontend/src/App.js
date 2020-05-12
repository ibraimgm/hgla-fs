import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import RadioGroup from './RadioGroup';

import { ReactComponent as svgProductIcon } from './images/product-icon.svg';
import svgInfoIcon from './images/icon-info.svg';

import NumberFormat from 'react-number-format';

const Frame = styled.div`
  background: #f1f6fb 0% 0% no-repeat padding-box;
  height: 100%;
  text-align: center;
`;

const PayText = styled.p`
  text-align: center;
  font: Regular 14px/26px Montserrat;
  letter-spacing: 0px;
  color: #1d5297;
  margin: 0;
  padding: 50px 0 10px 0;
`;

/*********************** */
const Wrapper = styled.div`
  background: #ff6a17 0% 0% no-repeat padding-box;
  border: 1px solid #dfecff;
  border-radius: 4px;
  padding: 9px 0;
  margin: 20px 16px;
`;

const Box = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dfecff;
  border-radius: 4px;
  text-align: center;
  padding: 40px 0 20px 0;
`;

const ProductIcon = styled(svgProductIcon)``;

const PlanName = styled.p`
  font: Bold 26px/26px Montserrat;
  letter-spacing: 0px;
  color: #1d5297;
  margin: 16px 0;
`;

const Separator = styled.hr`
  border: 1px solid #dfecff;
  margin: 30px 0;
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

const PriceData = styled.div`
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
    margin: 6px 0;
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
  width: 15px;
  height: 15px;
  position: relative;
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

const FeatureList = styled.ul`
  font: 16px/32px Montserrat;
  text-align: left;
  list-style-type: none;
  padding-left: 25px;

  li {
    display: inline-block;
  }

  .dash {
    border-bottom: 1px dashed #9eb8dc;
    margin-right: 10px;
  }
`;

const Product = ({ product }) => {
  return (
    <Wrapper>
      <Box>
        <ProductIcon />
        <PlanName>{product.name}</PlanName>
        <Separator />
        <PriceData>
          <Currency className="priceA" value={product.valueA} />
          <Currency className="priceB" value={product.valueB} />
          <span className="label">equivalente a</span>
          <div className="priceC">
            R$ <Currency prefix="" className="value" value={product.valueC} />
            /mês*
          </div>
        </PriceData>
        <BuyNow>Contrate Agora</BuyNow>
        <FreeDomain>
          1 ano de Domínio Grátis
          <InfoIcon />
        </FreeDomain>
        <Discount>
          economize <Currency value={product.valueD} />
          <span className="tag">{product.discount}% off</span>
        </Discount>
        <Separator />
        <FeatureList>
          <li className="dash">Sites ilimitados</li>
          <li>
            <strong>100 GB</strong> de Armazenamento
          </li>
          <li className="dash">
            Contas de E-mail <strong>Ilimitadas</strong>
          </li>
          <li>
            Criador de Sites{' '}
            <strong>
              <em>Grátis</em>
            </strong>
          </li>
          <li>
            Certificado SSL <strong>Grátis</strong> (https)
          </li>
        </FeatureList>
      </Box>
    </Wrapper>
  );
};

/*********************** */

function App() {
  const product = {
    name: 'Plano M',
    valueA: 647.64,
    valueB: 453.35,
    valueC: 12.59,
    valueD: 174.48,
    discount: 40,
  };

  return (
    <React.Fragment>
      <Header />
      <Frame>
        <PayText>Quero pagar a cada:</PayText>
        <RadioGroup
          options={['3 anos', '1 ano', '1 mês']}
          selected={'3 anos'}
        />
        <Product product={product} />
      </Frame>
    </React.Fragment>
  );
}

export default App;
