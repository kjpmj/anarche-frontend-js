import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../style/color/palette';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  height: 2rem;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  &:active {
    background: ${palette.gray[9]};
  }

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${props =>
    props.blue &&
    css`
      background: ${palette.blue[5]};
      &:hover {
        background: ${palette.blue[4]};
      }

      &:active {
        background: ${palette.blue[6]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

function Button(props) {
  return props.to ? (
    <StyledLink {...props} blue={props.blue ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
}

export default Button;
