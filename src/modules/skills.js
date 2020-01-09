import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionType,
} from '../lib/createRequestSaga';
import * as skillsAPI from '../lib/api/skills';
import { takeLatest } from 'redux-saga/effects';

const SKILL_NAMES = [
  '축산',
  '농사',
  '금속',
  '벌채',
  '채집',
  '재봉',
  '가죽',
  '목공',
  '석공',
  '손재주',
];

const getLaborDownPercent = value => {
  if (value < 30000) {
    return 0;
  } else if (value >= 30000 && value < 40000) {
    return 5;
  } else if (value >= 40000 && value < 50000) {
    return 10;
  } else if (value >= 50000 && value < 70000) {
    return 15;
  } else if (value >= 70000 && value < 150000) {
    return 20;
  } else if (value >= 150000 && value < 180000) {
    return 25;
  } else if (value >= 180000 && value < 230000) {
    return 30;
  } else if (value >= 230000) {
    return 40;
  }
};

const [
  GET_SKILLS,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILURE,
] = createRequestActionType('skills/GET_SKILLS');
const CHANGE_SKILLS = 'skills/CHANGE_SKILLS';
const CHANGE_COMMISSION = 'skills/CHANGE_COMMISSION';
const CHANGE_LIVING_GOLD = 'skills/CHANGE_LIVING_GOLD';
const CHANGE_AUCTION = 'skills/CHANGE_AUCTION';

export const getSkills = createAction(GET_SKILLS, ({ server, nickname }) => ({
  server,
  nickname,
}));
export const changeSkills = createAction(
  CHANGE_SKILLS,
  ({ skillName, value }) => ({
    skillName,
    value,
  }),
);
export const changeCommission = createAction(CHANGE_COMMISSION);
export const changeLivingGold = createAction(CHANGE_LIVING_GOLD);
export const changeAuction = createAction(CHANGE_AUCTION);

const getSkillsSaga = createRequestSaga(GET_SKILLS, skillsAPI.getSkills);
export function* skillsSaga() {
  yield takeLatest(GET_SKILLS, getSkillsSaga);
}

const initialState = {
  skills: SKILL_NAMES.map(skillName => {
    return {
      skillName,
      skillValue: 0,
      laborDownPercent: 0,
    };
  }),
  commission: 0,
  livingGold: 0,
  auction: 'garden',
  error: null,
};

const skills = handleActions(
  {
    [GET_SKILLS_SUCCESS]: (state, { payload: skills }) => ({
      ...state,
      skills,
      error: null,
    }),
    [GET_SKILLS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_SKILLS]: (state, { payload: { skillName, value } }) => ({
      ...state,
      skills: state.skills.map(skill =>
        skill.skillName === skillName
          ? {
              ...skill,
              skillValue: value,
              laborDownPercent: getLaborDownPercent(value),
            }
          : skill,
      ),
      error: null,
    }),
    [CHANGE_COMMISSION]: (state, { payload: commission }) => ({
      ...state,
      commission,
    }),
    [CHANGE_LIVING_GOLD]: (state, { payload: livingGold }) => ({
      ...state,
      livingGold,
    }),
    [CHANGE_AUCTION]: (state, { payload: auction }) => ({
      ...state,
      auction,
    }),
  },
  initialState,
);

export default skills;
