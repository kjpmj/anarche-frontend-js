import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../modules/skills';
import SkillsForm from '../../components/skills/SkillsForm';

function SkillsFormContainer() {
  const dispatch = useDispatch();
  const { error } = useSelector(({ skills, error }) => ({
    error: skills.error,
    // loading: loading['skills/GET_SKILLS'],
  }));

  const onSubmit = useCallback(
    (server, nickname) => {
      dispatch(getSkills({ server, nickname }));
    },
    [dispatch],
  );

  return <SkillsForm onSubmit={onSubmit} error={error} />;
}

export default SkillsFormContainer;
