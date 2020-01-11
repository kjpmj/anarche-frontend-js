import React, { useCallback } from 'react';
import Tab3 from '../../components/skills/Tab3';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeItem,
} from '../../modules/skillsTab3';

function Tab3Container() {
  const dispatch = useDispatch();
  const { commission, item, skills } = useSelector(
    ({ skills, skillTab3 }) => ({
      commission: skills.commission,
      item: skillTab3.item,
      skills: skills.skills,
    })
  );

  const onItemChange = useCallback((materialName, value) => {
    dispatch(changeItem({materialName, value}));
  }, [dispatch]);

  return <Tab3 item={item} commission={commission} skills={skills} onItemChange={onItemChange}/>;
}

export default Tab3Container;
