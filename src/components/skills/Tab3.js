import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../style/color/palette';

/**
 *
 */
const Tab3Block = styled.div`
  color: ${palette.gray[7]};
`;

const ItemHeader = styled.div`
  display: flex;
  height: 3rem;
  background-color: ${palette.gray[7]};
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

function Tab3({ item, commission, onItemChange, skills }) {
  const materialList = item.itemMaterial;
  const skill = skills.find(skill => skill.skillName === item.itemSkill);
  const laborDownPercent = skill.laborDownPercent;

  const handleItemChange = e => {
    const { dataset, value } = e.target;
    onItemChange(dataset.materialname, value);
  };

  return (
    <Tab3Block>
      <ItemWrapper>
        <ItemHeader>
          <ItemInfo>
            <div>{item.itemName}</div>
            <div>숙련도: [{item.itemSkill}]</div>
          </ItemInfo>
        </ItemHeader>
        <ItemContent>
          <TableHeader>
            <div>재료</div>
            <div>수량</div>
            <div>가격</div>
            <div>총 노동력</div>
            <div>이익</div>
            <div>노동력 1000당 이익</div>
          </TableHeader>
          {materialList.map(material => {
            const realLabor = Math.ceil(
              (material.labor * (100 - laborDownPercent)) / 100,
            );
            const labor = material.count * realLabor;
            const profit = material.count * material.price;
            const profitPer1000 =
              1000 * profit === 0 ? 0 : (1000 * profit) / labor;

            return (
              <TableContent key={material.name}>
                <div>
                  <TableInput value={material.name} readOnly textAlign="left" />
                </div>
                <div>
                  <TableInput
                    value={material.count}
                    onChange={handleItemChange}
                    data-materialname={material.name}
                    textAlign="right"
                  />
                </div>
                <div>
                  <TableInput
                    value={material.price}
                    readOnly
                    textAlign="right"
                  />
                </div>
                <div>
                  <TableInput value={labor} readOnly textAlign="right" />
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
    </Tab3Block>
  );
}

export default React.memo(Tab3);
