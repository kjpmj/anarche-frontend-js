import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionType,
} from '../lib/createRequestSaga';
import * as skillsAPI from '../lib/api/skills';
import { takeLatest } from 'redux-saga/effects';

const ITEMS = [
  {
    itemName: '철 주괴',
    itemSkill: '금속',
    itemPrice: 0,
    itemMaterial: [
      {
        name: '철광석',
        price: 0,
        count: 1000,
        labor: 5,
        manufact: 5,
        multiple: 1,
      },
      {
        name: '철광석:대량',
        price: 0,
        count: 1000,
        labor: 50,
        manufact: 50,
        multiple: 10,
      },
    ],
  },
  {
    itemName: '목재',
    itemSkill: '목공',
    itemPrice: 0,
    itemMaterial: [
      {
        name: '통나무',
        price: 0,
        count: 1000,
        labor: 5,
        manufact: 5,
        multiple: 1,
      },
      {
        name: '통나무:대량',
        price: 0,
        count: 1000,
        labor: 50,
        manufact: 50,
        multiple: 10,
      },
    ],
  },
  {
    itemName: '석재',
    itemSkill: '석공',
    itemPrice: 0,
    itemMaterial: [
      {
        name: '암석',
        price: 0,
        count: 1000,
        labor: 5,
        manufact: 5,
        multiple: 1,
      },
      {
        name: '암석:대량',
        price: 0,
        count: 1000,
        labor: 50,
        manufact: 50,
        multiple: 10,
      },
    ],
  },
  {
    itemName: '가죽',
    itemSkill: '가죽',
    itemPrice: 0,
    itemMaterial: [
      {
        name: '생가죽',
        price: 0,
        count: 1000,
        labor: 5,
        manufact: 5,
        multiple: 1,
      },
      {
        name: '생가죽:대량',
        price: 0,
        count: 1000,
        labor: 50,
        manufact: 50,
        multiple: 10,
      },
    ],
  },
  {
    itemName: '옷감',
    itemSkill: '재봉',
    itemPrice: 0,
    itemMaterial: [
      {
        name: '양털',
        price: 0,
        count: 1000,
        labor: 5,
        manufact: 5,
        multiple: 1,
      },
      {
        name: '목화솜',
        price: 0,
        count: 2000,
        labor: 5,
        manufact: 10,
        multiple: 1,
      },
      {
        name: '양털:대량',
        price: 0,
        count: 1000,
        labor: 50,
        manufact: 50,
        multiple: 10,
      },
      {
        name: '목화솜:대량',
        price: 0,
        count: 2000,
        labor: 50,
        manufact: 100,
        multiple: 10,
      },
    ],
  },
];

const CHANGE_ITEM = 'skillsTab1/CHANGE_ITEM';
const CHANGE_PRICE = 'skillsTab1/CHANGE_PRICE';
const [
  GET_ITEM_PRICE,
  GET_ITEM_PRICE_SUCCESS,
  GET_ITEM_PRICE_FAILURE,
] = createRequestActionType('skillsTab1/GET_ITEM_PRICE');

export const changeItem = createAction(
  CHANGE_ITEM,
  ({ itemName, materialName, col, value }) => ({
    itemName,
    materialName,
    col,
    value,
  }),
);
export const changePrice = createAction(
  CHANGE_PRICE,
  ({ itemName, value }) => ({
    itemName,
    value,
  }),
);
export const getItemPrice = createAction(
  GET_ITEM_PRICE,
  ({ server, itemName }) => ({
    server,
    itemName,
  }),
);

const getItemPriceSaga = createRequestSaga(
  GET_ITEM_PRICE,
  skillsAPI.getItemPriceTab1,
);
export function* itemPriceSaga() {
  yield takeLatest(GET_ITEM_PRICE, getItemPriceSaga);
}

const initialState = {
  items: ITEMS,
  error: null,
};

const skillTab1 = handleActions(
  {
    [CHANGE_ITEM]: (
      state,
      { payload: { itemName, materialName, col, value } },
    ) => ({
      ...state,
      items: state.items.map(item =>
        item.itemName === itemName
          ? {
              ...item,
              itemMaterial: item.itemMaterial.map(material =>
                material.name === materialName
                  ? { ...material, [col]: value }
                  : material,
              ),
            }
          : item,
      ),
    }),
    [CHANGE_PRICE]: (state, { payload: { itemName, value } }) => ({
      ...state,
      items: state.items.map(item =>
        item.itemName === itemName ? { ...item, itemPrice: value } : item,
      ),
    }),
    [GET_ITEM_PRICE_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      items: state.items.map(item =>
        item.itemName === list[0].name
          ? {
              ...item,
              itemPrice: list[0].price,
              itemMaterial: item.itemMaterial.map(material => {
                const obj = list.find(
                  el => el.name === material.name.replace(':대량', ''),
                );
                return obj ? { ...material, price: obj.price } : material;
              }),
            }
          : item,
      ),
    }),
    [GET_ITEM_PRICE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default skillTab1;
