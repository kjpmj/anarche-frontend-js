import { createAction, handleActions } from 'redux-actions';

const ITEM = {
  itemName: '주머니',
  itemSkill: '손재주',
  itemMaterial: [
    {
      name: '왕자의 주머니',
      count: 100,
      labor: 10,
      price: 0.425,
    },
    {
      name: '여왕의 주머니',
      count: 100,
      labor: 20,
      price: 0.85,
    },
  ],
};

const CHANGE_ITEM = 'skillsTab3/CHANGE_ITEM';

export const changeItem = createAction(
  CHANGE_ITEM,
  ({ materialName, value }) => ({
    materialName,
    value,
  }),
);

const initialState = {
  item: ITEM,
  error: null,
};

const skillTab3 = handleActions(
  {
    [CHANGE_ITEM]: (state, { payload: { materialName, value } }) => ({
      ...state,
      item: {
        ...state.item,
        itemMaterial: state.item.itemMaterial.map(material =>
          materialName === material.name
            ? {
                ...material,
                count: value,
              }
            : material,
        ),
      },
    }),
  },
  initialState,
);

export default skillTab3;
