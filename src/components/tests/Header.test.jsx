import React from "react";
import {render} from '../../test-helper/index'
import Header from '../Header'

describe('Header', () => {
    let props;
    beforeEach(() => {
        props = {
            children: <div>header</div>
        }
    });
    it('should display header correctly', () => {
       const { asFragment } = render(<Header {...props} />)
       expect(asFragment()).toMatchSnapshot();
    });
});