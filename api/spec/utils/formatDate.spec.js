// File: api/spec/utils/formatDate.spec.js

const formattedDate = require('../../utils/formatDate');

describe('formattedDate', () => {
  it('should return a formatted date string for a given Unix timestamp', () => {
    const unixTimestamp = 1626033600; // July 12, 2021
    const expectedDateString = 'Sunday, 11 July 2021'; //to match local timezone

    const formattedDateString = formattedDate(unixTimestamp);

    expect(formattedDateString).toEqual(expectedDateString);
  });

  it('should return a formatted date string for a different Unix timestamp', () => {
    const unixTimestamp = 1630310400; // August 30, 2021
    const expectedDateString = 'Monday, 30 August 2021';

    const formattedDateString = formattedDate(unixTimestamp);

    expect(formattedDateString).toEqual(expectedDateString);
  });
});
