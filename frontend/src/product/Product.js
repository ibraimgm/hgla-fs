import React from 'react';
import styled from '@emotion/styled';

import { ReactComponent as svgProductIcon } from '../images/product-icon.svg';
import PriceBox from './PriceBox';
import FeatureList from './FeatureList';

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

const ProductName = styled.p`
  font: Bold 26px/26px Montserrat;
  letter-spacing: 0px;
  color: #1d5297;
  margin: 16px 0;
`;

const Separator = styled.hr`
  border: 1px solid #dfecff;
  margin: 30px 0;
`;

const Product = ({ product }) => {
  const { name, ...productValues } = product;

  return (
    <Wrapper>
      <Box>
        <ProductIcon />
        <ProductName>{name}</ProductName>
        <Separator />
        <PriceBox {...productValues} />
        <Separator />
        <FeatureList />
      </Box>
    </Wrapper>
  );
};

export default Product;
