import React from "react";
import {render} from '../../test-helper/index'
import Pagination from '../Pagination'

describe('Pagination', () => {
    let props;
    beforeEach(() => {
        props = {
            details: {
                next: '/url/',

                previous: null,
                totalItems: 250,
                currentPage: 1,
                pageSize: 20,
                isFilter: false,
                startIndex: 0,
                endIndex: 19
            },
            previousPage: jest.fn(),
            nextPage: jest.fn()
        }
    });
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('should display pagination correctly', () => {
       const { asFragment } = render(<Pagination {...props} />)
       expect(asFragment()).toMatchSnapshot();
    });
    it('should paginate for user', () => {
        props.details.previous = '/url'
        const { container } = render(<Pagination {...props} />)
        expect(container.querySelector('.paginate')).toBeInTheDocument()        
    });
    it('should display next icon as disabled if pagination reach end', () => {
        props.details.next = null;
        const { container } = render(<Pagination {...props} />)
        expect(container.querySelector('.disabled')).toBeInTheDocument()
    });
    it('should display next icon as disabled if pagination at start point', () => {
        props.details.previous = null;
        const { container } = render(<Pagination {...props} />)
        expect(container.querySelector('.disabled')).toBeInTheDocument()
    });
    it('should display next icon as disabled if pagination reach end for isFilter true', () => {
        props.details.isFilter = true;
        props.details.endIndex = 250;
        const { container } = render(<Pagination {...props} />)
        expect(container.querySelector('.disabled')).toBeInTheDocument()
    });
    it('should display next icon as disabled if pagination at start point for isFilter true', () => {
        props.details.isFilter = true;
        props.details.startIndex = 0;
        const { container } = render(<Pagination {...props} />)
        expect(container.querySelector('.disabled')).toBeInTheDocument()
    });
});