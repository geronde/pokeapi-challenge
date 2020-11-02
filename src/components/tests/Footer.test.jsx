import React from "react";
import {render} from '../../test-helper/index'
import Footer from '../Footer'

describe('Footer', () => {
    it('should display Footer correctly', () => {
       const { asFragment } = render(<Footer />)
       expect(asFragment()).toMatchSnapshot();
    });
});