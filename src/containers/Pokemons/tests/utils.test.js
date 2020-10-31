import { getIdFromUrl, paginate } from '../utils';

describe('getIdFromUrl', () => {
    it('should split by / and return second last index', () => {
        expect(getIdFromUrl('/pokemons/4/pikatchu')).toEqual('4')
    });
});

describe('paginate', () => {
    it('should paginate details', () => {
        const totalItems = 60
        const currentPage = 1
        const pageSize = 10
        expect(paginate(totalItems, currentPage, pageSize)).toEqual({
            "currentPage": 1,
            "endIndex": 9,
            "endPage": 6,
            "pageSize": 10,
            "pages": [1,2,3,4,5,6,],
            "startIndex": 0,
            "startPage": 1,
            "totalItems": 60,
            "totalOfPages": 6,
        })
    });

    it('should paginate details for currentPage < 0 ', () => {
        const totalItems = 60
        const currentPage = -1
        const pageSize = 10
        expect(paginate(totalItems, currentPage, pageSize)).toEqual({
            "currentPage": 1,
            "endIndex": 9,
            "endPage": 6,
            "pageSize": 10,
            "pages": [1,2,3,4,5,6,],
            "startIndex": 0,
            "startPage": 1,
            "totalItems": 60,
            "totalOfPages": 6,
        })
    });

    it('should paginate details for currentPage > totalpages ', () => {
        const totalItems = 60
        const currentPage = 8
        const pageSize = 10
        expect(paginate(totalItems, currentPage, pageSize)).toEqual({
            "currentPage": 6,
            "endIndex": 59,
            "endPage": 6,
            "pageSize": 10,
            "pages": [1,2,3,4,5,6,],
            "startIndex": 50,
            "startPage": 1,
            "totalItems": 60,
            "totalOfPages": 6,
        })
    });
});