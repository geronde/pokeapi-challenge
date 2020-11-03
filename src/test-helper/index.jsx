import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const render = (ui, { ...renderOptions } = {}) =>{
    function Wrapper({ children }) {
      return <BrowserRouter>{children}</BrowserRouter>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  }