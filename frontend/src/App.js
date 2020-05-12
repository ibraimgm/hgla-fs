import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import RadioGroup from './RadioGroup';
import ProductList from './product/ProductList';

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

function App() {
  const product = {
    name: 'Plano M',
    valueA: 647.64,
    valueB: 453.35,
    valueC: 12.59,
    valueD: 174.48,
    discount: 40,
  };

  const products = [product, product, product];

  return (
    <React.Fragment>
      <Header />
      <Frame>
        <PayText>Quero pagar a cada:</PayText>
        <RadioGroup
          options={['3 anos', '1 ano', '1 mês']}
          selected={'3 anos'}
        />
        <ProductList products={products} />
      </Frame>
    </React.Fragment>
  );
}

export default App;
