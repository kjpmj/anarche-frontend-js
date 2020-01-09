import React from 'react';
import styled from 'styled-components';
import palette from '../../style/color/palette';

/**
 *
 */
const SkillsEtcInfoBlock = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const EtcInfoWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  > div {
    flex-basis: 20%;
    line-height: 1.5rem;
    height: 1.5rem;
  }
`;

const Label = styled.label``;

const Input = styled.input`
  border: 1px solid ${palette.gray[6]};
  height: 1.5rem;
  border-radius: 5px;
  outline: none;
  text-align: right;
  width: 50%;
  color: ${palette.gray[7]};
  padding-right: 2px;
  font-family: NanumSquareRoundB, sans-serif;

  & + span {
    margin-left: 2px;
  }

  &:focus {
    border: 1px solid ${palette.blue[6]};
  }
`;

function SkillsEtcInfo({
  commission,
  livingGold,
  auction,
  onCommissionChange,
  onLivingGoldChange,
  onAuctionChange,
}) {
  const handleCommissionChange = e => {
    let value = parseInt(e.target.value);

    if (!e.target.value) {
      onCommissionChange('');
      return;
    }

    if (Number.isNaN(value)) {
      return;
    }

    if (value <= 0) {
      value = 0;
    }

    if (value > 100) {
      value = 100;
    }

    onCommissionChange(value);
  };

  const handleLivingGoldChange = e => {
    let value = parseInt(e.target.value);

    if (!e.target.value) {
      onLivingGoldChange('');
      return;
    }

    if (Number.isNaN(value)) {
      return;
    }

    onLivingGoldChange(value);
  };

  const handleAuctionChange = e => {
    onAuctionChange(e.target.value);
  };

  return (
    <SkillsEtcInfoBlock>
      <EtcInfoWrapper>
        <div>
          <Label>경매장 수수료: </Label>
        </div>
        <div>
          <Input
            type="text"
            value={commission}
            onChange={handleCommissionChange}
          />
          <span>%</span>
        </div>
      </EtcInfoWrapper>
      <EtcInfoWrapper>
        <div>
          <Label>생활점수 10000점당 골드: </Label>
        </div>
        <div>
          <Input
            type="text"
            value={livingGold}
            onChange={handleLivingGoldChange}
          />
          <span>G</span>
        </div>
      </EtcInfoWrapper>
      <EtcInfoWrapper>
        <div>
          <Label>경매장: </Label>
        </div>
        <div>
          <select value={auction} onChange={handleAuctionChange}>
            <option value="garden">정원</option>
            <option value="TOTAL">통합서버군</option>
          </select>
        </div>
      </EtcInfoWrapper>
    </SkillsEtcInfoBlock>
  );
}

export default React.memo(SkillsEtcInfo);
