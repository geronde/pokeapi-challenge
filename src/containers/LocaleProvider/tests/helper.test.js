import * as translations from '../../../translations';
import { getTranslate } from '../helper';

describe('getTranslate', () => {
  it('should retun the correct translation by locale and key and return key no translation was available', () => {
    expect(getTranslate('en')('key')).toEqual('key');
  });
  it('should retun the correct translation by locale and key', () => {
    translations.translation = { other: 'other' };
    expect(getTranslate('en')('other')).toEqual('other');
  });
});
