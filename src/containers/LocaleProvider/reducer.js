import {
  CHANGE_LOCALE,
  RESET_LOCALE,
  DEFAULT_LOCALE,
} from './constants';
import { getTranslate } from './helper';

export const initialState = {
  locale: DEFAULT_LOCALE,
  translate: getTranslate(DEFAULT_LOCALE),
};

const localeReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        locale: action.locale,
        translate: getTranslate(action.locale),
      };
    case RESET_LOCALE:
      return { ...initialState };
    default:
      return { ...initialState };
  }
};

export default localeReducer;
