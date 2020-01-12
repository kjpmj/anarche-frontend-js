import React from 'react';
import Tab from '../common/Tab';
import styled from 'styled-components';
import Tab1Container from '../../containers/skills/Tab1Container';
import Tab2Container from '../../containers/skills/Tab2Container';
import Tab3Container from '../../containers/skills/Tab3Container';

const SkillTabBlock = styled.div`
  margin-top: 20px;
`;

function SkillsTab() {
  const tabList = [
    {
      tabLabel: '재료1',
      tabContent: <Tab1Container />,
    },
    {
      tabLabel: '재료2',
      tabContent: <Tab2Container />,
    },
    {
      tabLabel: '주머니',
      tabContent: <Tab3Container />,
    },
  ];

  return (
    <SkillTabBlock>
      <Tab tabList={tabList} />
    </SkillTabBlock>
  );
}

export default SkillsTab;
