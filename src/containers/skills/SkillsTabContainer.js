import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkillsTab from '../../components/skills/SkillsTab';
import {
  changeItem,
  changePrice,
  getItemPrice,
} from '../../modules/skillsTab1';

function SkillsTabContainer() {
  const dispatch = useDispatch();
  const { commission, auction, tab1Items, skills } = useSelector(
    ({ skills, skillTab1 }) => ({
      commission: skills.commission,
      auction: skills.auction,
      tab1Items: skillTab1.items,
      skills: skills.skills,
    }),
  );

  const onItemChange = useCallback(
    (itemName, materialName, col, value) => {
      dispatch(changeItem({ itemName, materialName, col, value }));
    },
    [dispatch],
  );

  const onPriceChange = useCallback(
    (itemName, value) => {
      dispatch(changePrice({ itemName, value }));
    },
    [dispatch],
  );

  const onItemPriceClick = useCallback(
    itemName => {
      dispatch(getItemPrice({ server: auction, itemName }));
    },
    [dispatch, auction],
  );

  return (
    <SkillsTab
      commission={commission}
      tab1Items={tab1Items}
      onItemChange={onItemChange}
      onPriceChange={onPriceChange}
      onItemPriceClick={onItemPriceClick}
      skills={skills}
    />
  );
}

export default SkillsTabContainer;
