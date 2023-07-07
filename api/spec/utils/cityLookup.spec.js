//file: api/spec/cityLookup.spec.js

const cityLookup = require('../../utils/cityLookup');

describe('cityLookup', () => {
  it('should correctly provide lat and lon of the given city', () => {
    expect(cityLookup.brighton).toEqual({
      lat: 50.8214626,
      lon: -0.1400561,
    });
  });
});
