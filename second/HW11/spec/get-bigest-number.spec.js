const { getBigestNumber } = require('../src/get-bigest-number');

describe('getBigestNumber', () => {
    it('should return max value', async () => {
        const result = getBigestNumber(1, 2, 3, 4, 5);
        expect(result).toBe(5);
    });
    it('should throw if arguments length < 2', async () => {
        expect(() => {
            getBigestNumber(1);
        }).toThrowError('Not enough arguments');
    });
    it('should throw if arguments length > 10', async () => {
        expect(() => {
            getBigestNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0);
        }).toThrowError('Too many arguments');
    });
    it('should throw if arguments type is not number', async () => {
        expect(() => {
            getBigestNumber('Epam', 2, 5);
        }).toThrowError('Wrong argument type');
    });

});