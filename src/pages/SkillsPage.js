import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import SkillsListContainer from '../containers/skills/SkillsListContainer';
import SkillsFormContainer from '../containers/skills/SkillsFormContainer';
import SkillsEtcInfoContainer from '../containers/skills/SkillsEtcInfoContainer';
import SkillsTab from '../components/skills/SkillsTab';

/**
 *
 */
const SkillsPageBlock = styled(Responsive)``;

const SkillsPageTabBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1548px;
  margin: 0 auto; /** 중앙 정렬 */

  /** 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 1548px) {
    width: 1224px;
  }
  @media (max-width: 1224px) {
    width: 100%;
  }
`;

function SkillsPage() {
  return (
    <>
      <SkillsPageBlock>
        <SkillsFormContainer />
        <SkillsListContainer />
        <SkillsEtcInfoContainer />
      </SkillsPageBlock>
      <SkillsPageTabBlock>
        <SkillsTab />
      </SkillsPageTabBlock>
    </>
  );
}

export default SkillsPage;
