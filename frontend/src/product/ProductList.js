import React from 'react';
import styled from '@emotion/styled';

import Product from './Product';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductList = ({ products, onBuyNow }) => (
  <Container>
    {products.map((product, idx) => (
      <Product
        key={idx}
        product={product}
        onBuyNow={() => onBuyNow && onBuyNow(product)}
      />
    ))}
  </Container>
);

export default ProductList;
