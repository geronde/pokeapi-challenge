import React, { createContext, useReducer } from 'react';
import localeReducer, { initialState } from './reducer';

export const LocaleContext = createContext(initialState);

export const LocaleContextProvider = ({ children }) => {
  // dispatch reducer
  const [state, dispatch] = useReducer(localeReducer, initialState);

  return (
    <LocaleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
