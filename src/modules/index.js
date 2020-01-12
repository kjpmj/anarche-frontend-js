import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import skills, { skillsSaga } from './skills';
import skillTab1, { itemPriceSaga } from './skillsTab1';
import skillTab2, {itemPriceSagaTab2} from './skillsTab2';
import skillTab3 from './skillsTab3';

const rootReducer = combineReducers({
  loading,
  skills,
  skillTab1,
  skillTab2,
  skillTab3,
});

export function* rootSaga() {
  yield all([skillsSaga(), itemPriceSaga(), itemPriceSagaTab2()]);
}

export default rootReducer;
