import React from 'react';
import Tab from '../common/Tab';
import styled from 'styled-components';
import Tab1 from './Tab1';

const SkillTabBlock = styled.div`
  margin-top: 20px;
`;

function SkillsTab({
  commission,
  tab1Items,
  onItemChange,
  onPriceChange,
  onItemPriceClick,
  skills,
}) {
  const tabList = [
    {
      tabLabel: '재료1',
      tabContent: (
        <Tab1
          commission={commission}
          items={tab1Items}
          onItemChange={onItemChange}
          onPriceChange={onPriceChange}
          onItemPriceClick={onItemPriceClick}
          skills={skills}
        />
      ),
    },
    {
      tabLabel: '재료2',
      tabContent: <div>재료2 탭.</div>,
    },
  ];

  return (
    <SkillTabBlock>
      <Tab tabList={tabList} />
    </SkillTabBlock>
  );
}

export default React.memo(SkillsTab);
