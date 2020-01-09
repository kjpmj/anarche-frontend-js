import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import SkillsListContainer from '../containers/skills/SkillsListContainer';
import SkillsFormContainer from '../containers/skills/SkillsFormContainer';
import SkillsEtcInfoContainer from '../containers/skills/SkillsEtcInfoContainer';
import SkillsTabContainer from '../containers/skills/SkillsTabContainer';

/**
 *
 */
const SkillsPageBlock = styled(Responsive)``;

function SkillsPage() {
  return (
    <SkillsPageBlock>
      <SkillsFormContainer />
      <SkillsListContainer />
      <SkillsEtcInfoContainer />
      <SkillsTabContainer />
    </SkillsPageBlock>
  );
}

export default SkillsPage;
