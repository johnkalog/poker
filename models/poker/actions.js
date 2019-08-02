// action creators
import actionCreator from '../../lib/actionCreator';
import * as types from './types';

export const newCards = actionCreator(types.NEW_CARDS);

export const newRound = actionCreator(types.NEW_ROUND);

export const toggleCard = actionCreator(types.TOGGLE_CARD);

export const changeCards = actionCreator(types.CHANGE_CARDS);

export const changeBest = actionCreator(types.CHANGE_BEST);
