import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkillsList from '../../components/skills/SkillsList';
import { changeSkills } from '../../modules/skills';

function SkillsListContainer() {
  const dispatch = useDispatch();
  const { skills } = useSelector(({ skills }) => ({
    skills: skills.skills,
  }));

  const onChange = useCallback(
    (skillName, value) => {
      dispatch(changeSkills({ skillName, value }));
    },
    [dispatch],
  );

  return <SkillsList skills={skills} onChange={onChange} />;
}

export default SkillsListContainer;
