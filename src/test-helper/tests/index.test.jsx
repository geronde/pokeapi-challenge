import React from 'react';
import { render } from '../index';

describe('render', () => {
    it('should render component with router', () => {
        const component = <div>hello component</div>
        
        expect(render(component)).toMatchSnapshot()
    });
});