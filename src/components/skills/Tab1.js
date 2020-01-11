import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import palette from '../../style/color/palette';

/**
 *
 */
const Tab1Block = styled.div`
  color: ${palette.gray[7]};
`;

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

const skillNameList = ['금속', '목공', '가죽', '석공', '재봉'];

function Tab1({
  items,
  commission,
  onItemChange,
  onPriceChange,
  onItemPriceClick,
  skills,
}) {
  const laborDownPercentList = skills.filter(skill =>
    skillNameList.includes(skill.skillName),
  );

  return (
    <Tab1Block>
      {items.map(item => {
        const { laborDownPercent } = laborDownPercentList.find(
          el => el.skillName === item.itemSkill,
        );

        const materialList = item.itemMaterial;

        const handleItemChange = e => {
          const { dataset, name, value } = e.target;
          onItemChange(dataset.itemname, dataset.materialname, name, value);
        };

        const handlePriceChange = e => {
          const { dataset, value } = e.target;
          onPriceChange(dataset.itemname, value);
        };

        const handleItemPriceClick = e => {
          const { dataset } = e.target;
          onItemPriceClick(dataset.itemname);
        };

        return (
          <ItemWrapper key={item.itemName}>
            <ItemHeader>
              <ItemInfo>
                <div>{item.itemName}</div>
                <div>숙련도: [{item.itemSkill}]</div>
                <div>
                  <span>경매장 평균가: </span>
                  <HeaderInput
                    value={item.itemPrice}
                    onChange={handlePriceChange}
                    data-itemname={item.itemName}
                  />
                  <span>G</span>
                </div>
              </ItemInfo>
              <ButtonWrapper>
                <Button
                  data-itemname={item.itemName}
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
                <div>가공 노동력</div>
                <div>가공된 수량</div>
                <div>총 노동력</div>
                <div>매출</div>
                <div>이익</div>
                <div>노동력 1000당 이익</div>
              </TableHeader>
              {materialList.map(material => {
                const realLabor = Math.ceil(
                  (material.labor * (100 - laborDownPercent)) / 100,
                );
                const labor =
                  Math.floor(material.count / material.manufact) * realLabor;
                const manufactCount = Math.floor(
                  material.count / material.manufact,
                );
                const sale =
                  ((item.itemPrice * manufactCount) / 100) *
                  (100 - commission) *
                  material.multiple;
                const profit =
                  material.manufact > material.count
                    ? 0
                    : sale - material.price * material.count;
                const profitPer1000 =
                  1000 * profit === 0 ? 0 : (1000 * profit) / labor;
                return (
                  <TableContent key={material.name}>
                    <div>
                      <TableInput
                        value={material.name}
                        readOnly
                        textAlign="left"
                      />
                    </div>
                    <div>
                      <TableInput
                        value={material.price}
                        onChange={handleItemChange}
                        data-itemname={item.itemName}
                        data-materialname={material.name}
                        name="price"
                        textAlign="right"
                      />
                    </div>
                    <div>
                      <TableInput
                        value={material.count}
                        onChange={handleItemChange}
                        data-itemname={item.itemName}
                        data-materialname={material.name}
                        name="count"
                        textAlign="right"
                      />
                    </div>
                    <div>
                      <TableInput value={labor} readOnly textAlign="right" />
                    </div>
                    <div>
                      <TableInput
                        value={manufactCount}
                        readOnly
                        textAlign="right"
                      />
                    </div>
                    <div>
                      <TableInput value={labor} readOnly textAlign="right" />
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
                      <TableInput value={profitPer1000.toFixed(4)} readOnly />
                    </div>
                  </TableContent>
                );
              })}
            </ItemContent>
          </ItemWrapper>
        );
      })}
    </Tab1Block>
  );
}

export default React.memo(Tab1);
