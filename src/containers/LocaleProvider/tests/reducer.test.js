import { CHANGE_LOCALE } from "../constants";
import localeReducer from "../reducer";
import * as helpers from '../helper'

describe('localeReducer', () => {
    afterEach(() => {
        jest.resetAllMocks()
    });
    it('should return with correct state when action type is CHANGE_LOCALE', () => {
        jest.spyOn(helpers,'getTranslate').mockReturnValueOnce('fr-value')
        expect(localeReducer('locale', {type: CHANGE_LOCALE, locale: 'fr'})).toEqual({
            locale: 'fr',
            translate: 'fr-value'
        })
        expect(helpers.getTranslate).toHaveBeenCalledWith('fr')
    });
    it('should return with correct intial state when action type is default', () => {
        expect(localeReducer('locale', {type: 'other', locale: 'pl'})).toEqual({
            locale: 'en',
                translate: expect.any(Function)
        });
    });
});