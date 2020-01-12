import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../style/color/palette';
import Button from '../common/Button';

/**
 *
 */
const Tab2Block = styled.div``;

const ItemHeader = styled.div`
  display: flex;
  height: 3rem;
  background-color: ${palette.gray[7]};
`;

const ButtonWrapper = styled.div`
  flex-basis: 30%;
  text-align: right;
  height: 3rem;
  line-height: 3rem;

  button {
    margin-right: 2px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-basis: 70%;
  height: 3rem;
  line-height: 3rem;
  font-family: NanumSquareRoundB, sans-serif;
  font-size: 1.05rem;
  color: #ffffff;
  padding-left: 5px;

  > div:first-child {
    flex-basis: 15%;
  }

  > div:nth-child(2) {
    flex-basis: 20%;
  }

  > div:nth-child(3) {
    flex-basis: 30%;
  }

  > div:nth-child(4) {
    flex-basis: 15%;
  }

  > div:last-child() {
    flex-basis: 30%;
  }
`;

const ItemWrapper = styled.div`
  margin: 10px 0 10px 0;
`;

const ItemContent = styled.div``;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: NanumSquareRoundB, sans-serif;

  border-top: 1px solid ${palette.gray[5]};
  border-bottom: 1px solid ${palette.gray[5]};

  > div {
    text-align: center;
    flex-basis: 10%;
    padding: 5px 0 5px 0;
  }
`;

const TableContent = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid ${palette.gray[5]};

  > div {
    text-align: center;
    flex-basis: 10%;
    padding: 5px 0 5px 0;
  }
`;

const HeaderInput = styled.input`
  width: 30%;
  outline: none;
  padding-right: 2px;
  text-align: right;

  margin-right: 2px;
`;

const TableInput = styled.input`
  width: 90%;
  text-align: ${props => props.textAlign};
  padding-right: 2px;
  outline: none;
  border: 1px solid ${palette.gray[6]};
  height: 1.5rem;

  ${props =>
    props.readOnly
      ? css`
          border: none;
        `
      : css`
          &:hover {
            border: 1px solid ${palette.blue[5]};
          }
        `}
`;

function Tab2({
  commission,
  auction,
  livingGold,
  onItemChange,
  onPriceChange,
  onItemPriceClick,
  skills,
  meat,
}) {
  const laborDownPercentMeat = skills.find(skill => skill.skillName === '축산')
    .laborDownPercent;

  const handleItemChange = e => {
    const { dataset, name, value } = e.target;
    onItemChange(dataset.itemname, dataset.materialname, name, value);
  };

  const handlePriceChange = e => {
    const { dataset, value } = e.target;
    onPriceChange(dataset.itemname, dataset.itemtype, value);
  };

  const handleItemPriceClick = e => {
    const { dataset } = e.target;
    onItemPriceClick(dataset.itemname);
  };

  return (
    <Tab2Block>
      <ItemWrapper>
        <ItemHeader>
          <ItemInfo>
            <div>{meat.itemName}</div>
            <div>숙련도: [{meat.itemSkill}]</div>
            <div>
              <span>경매장 평균가: </span>
              <HeaderInput
                value={meat.itemPrice}
                onChange={handlePriceChange}
                data-itemname="meat"
                data-itemtype="itemPrice"
              />
              <span>G</span>
            </div>
            <div>{meat.subItemName}</div>
            <div>
              <span>경매장 평균가: </span>
              <HeaderInput
                value={meat.subItemPrice}
                onChange={handlePriceChange}
                data-itemname="meat"
                data-itemtype="subItemPrice"
              />
              <span>G</span>
            </div>
          </ItemInfo>
          <ButtonWrapper>
            <Button
              data-itemname={meat.itemName}
              onClick={handleItemPriceClick}
            >
              가격 조회
            </Button>
          </ButtonWrapper>
        </ItemHeader>
        <ItemContent>
          <TableHeader>
            <div>원료</div>
            <div>원료 가격</div>
            <div>원료 수량</div>
            <div>도축 노동력</div>
            <div>재료 수량</div>
            <div>가공 노동력</div>
            <div>손질된 고기</div>
            <div>생가죽</div>
            <div>총 노동력</div>
            <div>매출</div>
            <div>이익</div>
            <div>노동력 1000당 이익</div>
          </TableHeader>
          {meat.itemMaterial.map(material => {
            const materialPrice =
              material.priceType === 'GOLD'
                ? material.price
                : (material.price * livingGold) / 10000;

            const labor1 =
              Math.ceil(
                (material.labor1 * (100 - laborDownPercentMeat)) / 100,
              ) *
                material.count +
              2 * material.count;

            const result1 = material.count * material.result1;
            const labor2 =
              Math.ceil(
                (material.labor2 * (100 - laborDownPercentMeat)) / 100,
              ) *
              (result1 / 10);

            const result2 = Math.floor(result1 / 10) * material.result2;
            const result3 = material.count * material.result3;
            const totalLabor = labor1 + labor2;

            const sale =
              ((result2 * meat.itemPrice + result3 * meat.subItemPrice) / 100) *
              (100 - commission);
            const profit = sale - materialPrice * material.count;
            const profitPer1000 =
              1000 * profit === 0 ? 0 : (1000 * profit) / totalLabor;

            return (
              <TableContent key={material.name}>
                <div>
                  <TableInput value={material.name} readOnly textAlign="left" />
                </div>
                <div>
                  <TableInput
                    value={materialPrice}
                    onChange={handleItemChange}
                    data-itemname="meat"
                    data-materialname={material.name}
                    name="price"
                    textAlign="right"
                    readOnly
                  />
                </div>
                <div>
                  <TableInput
                    value={material.count}
                    onChange={handleItemChange}
                    data-itemname="meat"
                    data-materialname={material.name}
                    name="count"
                    textAlign="right"
                  />
                </div>
                <div>
                  <TableInput value={labor1} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput value={result1} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput value={labor2} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput value={result2} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput value={result3} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput value={totalLabor} readOnly textAlign="right" />
                </div>
                <div>
                  <TableInput
                    value={sale.toFixed(4)}
                    readOnly
                    textAlign="right"
                  />
                </div>
                <div>
                  <TableInput
                    value={profit.toFixed(4)}
                    readOnly
                    textAlign="right"
                  />
                </div>
                <div>
                  <TableInput
                    value={profitPer1000.toFixed(4)}
                    readOnly
                    textAlign="right"
                  />
                </div>
              </TableContent>
            );
          })}
        </ItemContent>
      </ItemWrapper>
    </Tab2Block>
  );
}

export default React.memo(Tab2);
