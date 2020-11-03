import React from 'react';
import {render} from '@testing-library/react'
import LocaleContextProvider from '..';

describe('LocalProvider',()=>{
    let props;
    beforeEach(() => {
        props = {
            children: <div>hello</div>
        }
    });

    it('should render LocaleContextProvider correctly', () => {
        const {asFragment} = render(<LocaleContextProvider {...props} />)

        expect(asFragment()).toMatchSnapshot();
    });
})