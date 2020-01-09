import styled from 'styled-components';
import React from 'react';
import palette from '../../style/color/palette';

const StyledInput = ({ placeholder, ...rest }) => {
  return (
    <WrapperLabel>
      <InnerInput {...rest} />
      <InnerLabelSpan>{placeholder}</InnerLabelSpan>
      <InnerBorderSpan></InnerBorderSpan>
    </WrapperLabel>
  );
};

const WrapperLabel = styled.label`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
`;

const InnerLabelSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  color: ${palette.gray[6]};
  transform-origin: 0 0;
  transition: all 0.2s ease;
`;

const InnerBorderSpan = styled.span`
  position: absolute;
  top: 26px;
  left: 0;
  height: 2px;
  width: 100%;
  background: ${palette.blue[6]};
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all 0.2s ease;
`;

const InnerInput = styled.input.attrs({
  type: 'text',
  placeholder: ' ',
})`
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  padding: 8px 0;
  border-bottom: 2px solid ${palette.gray[6]};
  background: none;
  border-radius: 0;
  color: ${palette.gray[7]};
  &:hover {
    background: rgba(34, 50, 84, 0.03);
  }
  &:focus {
    background: none;
    outline: none;
  }
  &:not(:placeholder-shown) + span {
    color: ${palette.blue[6]};
    transform: translateY(-20px) scale(0.8);
  }
  &:not(:-ms-input-placeholder) + span {
    color: ${palette.gray[6]};
    transform: translateY(-20px) scale(0.8);
  }
  &:focus + span {
    color: ${palette.blue[6]};
    transform: translateY(-20px) scale(0.8);
  }
  &:focus + span + span {
    transform: scaleX(1);
  }
`;

export default React.memo(StyledInput);
