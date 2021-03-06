import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import Header from './Header';
import RadioGroup from './RadioGroup';
import ProductList from './product/ProductList';
import * as product from './redux/modules/product';

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

const monthsByLabel = {
  '3 anos': 36,
  '1 ano': 12,
  '1 mês': 1,
};

const PROMO_CODE = 'PROMOHG40';

function App() {
  const [selected, setSelected] = useState('3 anos');
  const dispatch = useDispatch();
  const products = useSelector(product.getProducts);

  // initial data load
  useEffect(() => {
    dispatch(product.loadProducts());
  }, [dispatch]);

  // handles the 'Contrate Agora' button
  const buyNowHandler = (product) => {
    // gets the billing cycle name
    const months = monthsByLabel[selected];
    const { name: cycleName } = product.basePrice[months];

    const url = `?a=add&pid=${product.id}&billingcycle=${cycleName}&promocode=${PROMO_CODE}`;

    // just log to demonstrate that the correct url was built
    console.log(url);
  };

  return (
    <React.Fragment>
      <Header />
      <Frame>
        <PayText>Quero pagar a cada:</PayText>
        <RadioGroup
          options={['3 anos', '1 ano', '1 mês']}
          selected={selected}
          onClick={(clickedText) => {
            if (clickedText !== selected) {
              setSelected(clickedText);
              dispatch(product.calculateValues(monthsByLabel[clickedText]));
            }
          }}
        />
        <ProductList products={products} onBuyNow={buyNowHandler} />
      </Frame>
    </React.Fragment>
  );
}

export default App;
