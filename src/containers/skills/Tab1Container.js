import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeItem,
  changePrice,
  getItemPrice,
} from '../../modules/skillsTab1';
import Tab1 from '../../components/skills/Tab1';

function Tab1Container() {
  const dispatch = useDispatch();
  const { commission, auction, items, skills } = useSelector(
    ({ skills, skillTab1 }) => ({
      commission: skills.commission,
      auction: skills.auction,
      items: skillTab1.items,
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
    <Tab1
      commission={commission}
      items={items}
      onItemChange={onItemChange}
      onPriceChange={onPriceChange}
      onItemPriceClick={onItemPriceClick}
      skills={skills}
    />
  );
}

export default Tab1Container;
