import React from "react";
import {render} from '../../test-helper/index'
import Loader from '../Loader'

describe('Loader', () => {
    it('should display Loader correctly', () => {
       const { asFragment } = render(<Loader />)
       expect(asFragment()).toMatchSnapshot();
    });
});