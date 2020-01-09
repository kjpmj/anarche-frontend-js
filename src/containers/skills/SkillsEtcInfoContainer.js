import React, { useCallback } from 'react';
import SkillsEtcInfo from '../../components/skills/SkillsEtcInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCommission,
  changeLivingGold,
  changeAuction,
} from '../../modules/skills';

function SkillsEtcInfoContainer() {
  const dispatch = useDispatch();
  const { commission, livingGold, auction } = useSelector(({ skills }) => ({
    commission: skills.commission,
    livingGold: skills.livingGold,
    auction: skills.auction,
  }));

  const onCommissionChange = useCallback(
    value => {
      dispatch(changeCommission(value));
    },
    [dispatch],
  );

  const onLivingGoldChange = useCallback(
    value => {
      dispatch(changeLivingGold(value));
    },
    [dispatch],
  );

  const onAuctionChange = useCallback(
    value => {
      dispatch(changeAuction(value));
    },
    [dispatch],
  );

  return (
    <SkillsEtcInfo
      commission={commission}
      livingGold={livingGold}
      auction={auction}
      onCommissionChange={onCommissionChange}
      onLivingGoldChange={onLivingGoldChange}
      onAuctionChange={onAuctionChange}
    />
  );
}

export default SkillsEtcInfoContainer;
