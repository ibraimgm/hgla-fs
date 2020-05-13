/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import svgRadioOn from './images/radio-on.svg';
import svgRadioOff from './images/radio-off.svg';

const radioCss = () => css`
  font: Regular 16px/23px Montserrat;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 4px #4480c570;
  border: 1px solid #4480c5;
  border-radius: 21px;

  display: inline-block;
  list-style-type: none;
  padding: 0;
  margin: 6px auto;


  li {
    display: inline-block;
    padding: 10px 14px;
    cursor: pointer;

    span {
      border: 0;
      background: url('${svgRadioOff}') no-repeat padding-box;
      width: 18px;
      height: 18px;
      padding-right: 18px;
      padding-left: 5px;
    }
  }

  .selected {
    font: Bold 16px/23px Montserrat;
    letter-spacing: 0px;
    color: #FFFFFF;
    background: #4480c5 0% 0% no-repeat padding-box;
    border-radius: 21px;

    span {
      background: url('${svgRadioOn}') no-repeat padding-box;
    }
  }

  li:first-of-type {
    position: relative;
    left: -2px;
  }

  li:last-child {
    position: relative;
    left: 2px;
  }
`;

const RadioGroup = ({ options, selected, onClick }) => {
  return (
    <ul css={radioCss}>
      {options.map((opt, idx) => {
        const clsName = opt === selected ? 'selected' : '';

        return (
          <li
            key={idx}
            className={clsName}
            onClick={(e) => onClick && onClick(opt)}
          >
            <span />
            {opt}
          </li>
        );
      })}
    </ul>
  );
};

export default RadioGroup;
