import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import palette from '../../style/color/palette';

const StyledSelect = ({ placeholder, datas, onChange, width, ...rest }) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(() => {
    setOpen(open => !open);
  }, []);

  const handleChange = useCallback(
    e => {
      const newData = {
        code: e.target.dataset.code,
        value: e.target.innerHTML,
      };

      onChange(newData);
      setOpen(open => !open);
    },
    [onChange],
  );

  return (
    <SelectBoxBlock width={width}>
      <WrapperLabel onClick={onOpenChange}>
        <InnerInput {...rest} disabled />
        <InnerLabelSpan>{placeholder}</InnerLabelSpan>
        <InnerBorderSpan></InnerBorderSpan>
      </WrapperLabel>
      {open && (
        <SelectBoxListBlock width={width}>
          {datas.map(data => (
            <SelectBoxWrapper
              key={data.code}
              data-code={data.code}
              onClick={handleChange}
            >
              {data.value}
            </SelectBoxWrapper>
          ))}
        </SelectBoxListBlock>
      )}
    </SelectBoxBlock>
  );
};

const SelectBoxBlock = styled.div`
  width: ${props => props.width};
`;

const SelectBoxListBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 5px;
  position: absolute;
  z-index: 1000;
  border: 0.5px solid ${palette.gray[4]};
  width: ${props => props.width};
`;

const SelectBoxWrapper = styled.div`
  padding-left: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: ${palette.gray[7]};
  cursor: pointer;

  & + & {
    border-top: 0.5px solid ${palette.gray[4]};
  }

  &:hover {
    background-color: ${palette.blue[4]};
    color: #ffffff;
  }
`;

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

export default React.memo(StyledSelect);
