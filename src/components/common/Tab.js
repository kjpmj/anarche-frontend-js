import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../style/color/palette';

function Tab({ tabList }) {
  const [selected, setSelected] = useState(0);

  const handleClick = useCallback(e => {
    setSelected(parseInt(e.target.dataset.index));
  }, []);

  return (
    <TabBlock>
      {tabList.map((tab, index) => (
        <TabWrapper key={index}>
          {selected === index ? (
            <>
              <TabLabel onClick={handleClick} data-index={index} selected>
                {tab.tabLabel}
              </TabLabel>
              <TabContent selected>{tab.tabContent}</TabContent>
            </>
          ) : (
            <TabLabel onClick={handleClick} data-index={index}>
              {tab.tabLabel}
            </TabLabel>
          )}
        </TabWrapper>
      ))}
    </TabBlock>
  );
}

const TabBlock = styled.div`
  position: relative;
  background-color: ${palette.gray[6]};
  height: 3rem;
  display: flex;
  flex-direction: row;
  border-top: 2px solid ${palette.gray[7]};
`;

const TabWrapper = styled.div``;

const TabLabel = styled.div`
  color: #ffffff;
  height: 3rem;
  line-height: 3rem;
  position: relative;
  padding: 0 10px 0 10px;
  background-color: ${palette.gray[6]};
  border-right: 1px solid ${palette.gray[5]};

  ${props =>
    props.selected
      ? css`
          color: ${palette.gray[8]};
          background-color: #ffffff;
          border-right: none;
        `
      : css`
          cursor: pointer;
          &:hover {
            background-color: ${palette.gray[5]};
          }
        `}
`;

const TabContent = styled.div`
  position: absolute;
  border-bottom: 2px solid ${palette.gray[7]};
  padding: 5px 0 5px 0;
  left: 0;
  width: 100%;
  margin-bottom: 20px;
`;

export default Tab;
