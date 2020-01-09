import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import skills, { skillsSaga } from './skills';
import skillTab1, { itemPriceSaga } from './skillsTab1';

const rootReducer = combineReducers({
  loading,
  skills,
  skillTab1,
});

export function* rootSaga() {
  yield all([skillsSaga(), itemPriceSaga()]);
}

export default rootReducer;
