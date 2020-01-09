import React from 'react';
import styled from 'styled-components';
import SkillsInput from './SkillsInput';

/**
 *
 */
const SkillsListBlock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const SkillInputWrapDiv = styled.div`
  margin-top: 1rem;
`;

function SkillsList({ skills, onChange }) {
  return (
    <SkillsListBlock>
      {skills.map(skill => (
        <SkillInputWrapDiv key={skill.skillName}>
          <SkillsInput
            value={skill.skillValue}
            name={skill.skillName}
            placeholder={skill.skillName}
            onChange={onChange}
          />
        </SkillInputWrapDiv>
      ))}
    </SkillsListBlock>
  );
}

export default React.memo(SkillsList);
