import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab2 from '../../components/skills/Tab2';
import {
  changePrice,
  changeItem,
  getItemPrice,
} from '../../modules/skillsTab2';

function Tab2Container() {
  const dispatch = useDispatch();
  const { commission, auction, livingGold, skills, meat } = useSelector(
    ({ skills, skillTab2 }) => ({
      commission: skills.commission,
      livingGold: skills.livingGold,
      auction: skills.auction,
      skills: skills.skills,
      meat: skillTab2.meat,
    }),
  );

  const onItemChange = useCallback(
    (itemName, materialName, col, value) => {
      dispatch(changeItem({ itemName, materialName, col, value }));
    },
    [dispatch],
  );

  const onPriceChange = useCallback(
    (itemName, itemType, value) => {
      dispatch(changePrice({ itemName, itemType, value }));
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
    <Tab2
      commission={commission}
      auction={auction}
      livingGold={livingGold}
      skills={skills}
      onItemChange={onItemChange}
      onPriceChange={onPriceChange}
      onItemPriceClick={onItemPriceClick}
      meat={meat}
    />
  );
}

export default Tab2Container;
