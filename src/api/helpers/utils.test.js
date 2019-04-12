const { paramTruth } = require('../helpers/utils');

describe('paramTruth', () => {
  it('returns value of true for any param other than undefined or false strings', async () => {
    expect(paramTruth(undefined)).toEqual(false);
    expect(paramTruth('false')).toEqual(false);
    expect(paramTruth('no')).toEqual(false);
    expect(paramTruth('0')).toEqual(false);
    expect(paramTruth('f')).toEqual(false);
    expect(paramTruth('n')).toEqual(false);
    expect(paramTruth('False')).toEqual(false);
    expect(paramTruth('No')).toEqual(false);
    expect(paramTruth('F')).toEqual(false);
    expect(paramTruth('N')).toEqual(false);
    expect(paramTruth('')).toEqual(true);
    expect(paramTruth('fUlse')).toEqual(true);
    expect(paramTruth('true')).toEqual(true);
    expect(paramTruth('anything')).toEqual(true);
  });
});
