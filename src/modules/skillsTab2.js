import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionType,
} from '../lib/createRequestSaga';
import * as skillsAPI from '../lib/api/skills';
import { takeLatest } from 'redux-saga/effects';

const MEAT = {
  itemName: '손질된 고기',
  itemSkill: '축산',
  itemPrice: 0,
  subItemName: '생가죽',
  subItemSkill: '가죽',
  subItemPrice: 0,
  itemMaterial: [
    {
      name: '새끼 돼지',
      price: 1.25,
      count: 100,
      labor1: 15,
      labor2: 5,
      result1: 18,
      result2: 30,
      result3: 20,
      multiple: 1,
      priceType: 'GOLD',
    },
    {
      name: '젖소 송아지',
      price: 450,
      count: 100,
      labor1: 20,
      labor2: 5,
      result1: 18,
      result2: 50,
      result3: 32,
      multiple: 1,
      priceType: 'LIFE',
    },
    {
      name: '무지개 야타',
      price: 1125,
      count: 100,
      labor1: 25,
      labor2: 5,
      result1: 18,
      result2: 100,
      result3: 40,
      multiple: 1,
      priceType: 'LIFE',
    },
  ],
};

const CHANGE_ITEM = 'skillsTab2/CHANGE_ITEM';
const CHANGE_PRICE = 'skillsTab2/CHANGE_PRICE';
const [
  GET_ITEM_PRICE,
  GET_ITEM_PRICE_SUCCESS,
  GET_ITEM_PRICE_FAILURE,
] = createRequestActionType('skillsTab2/GET_ITEM_PRICE');

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
  ({ itemName, itemType, value }) => ({
    itemName,
    itemType,
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
  skillsAPI.getItemPriceTab2,
);
export function* itemPriceSagaTab2() {
  yield takeLatest(GET_ITEM_PRICE, getItemPriceSaga);
}

const initialState = {
  meat: MEAT,
  error: null,
};

const getItemByItemName = (state, itemName) => {
  switch (itemName) {
    case 'meat':
      return state.meat;
    default:
      return null;
  }
};

const skillTab2 = handleActions(
  {
    [CHANGE_ITEM]: (
      state,
      { payload: { itemName, materialName, col, value } },
    ) => {
      const item = getItemByItemName(state, itemName);

      return {
        ...state,
        [itemName]: {
          ...item,
          itemMaterial: item.itemMaterial.map(material =>
            material.name === materialName
              ? { ...material, [col]: value }
              : material,
          ),
        },
      };
    },
    [CHANGE_PRICE]: (state, { payload: { itemName, itemType, value } }) => {
      const item = getItemByItemName(state, itemName);

      return {
        ...state,
        [itemName]: {
          ...item,
          [itemType]: value,
        },
      };
    },
    [GET_ITEM_PRICE_SUCCESS]: (state, { payload: list }) => {
      let itemName = undefined;

      switch (list[0].name) {
        case '손질된 고기':
          itemName = 'meat';
          break;

        default:
          break;
      }

      const item = getItemByItemName(state, itemName);

      return {
        ...state,
        [itemName]: {
          ...item,
          itemPrice: list[0].price,
          subItemPrice: list[1] ? list[1].price : 0,
        },
      };
    },
    [GET_ITEM_PRICE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default skillTab2;
