/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const featureCss = css`
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

export default () => (
  <ul css={featureCss}>
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
  </ul>
);
