const { BirthdayService } = require('../src/birthday.service');

describe('BirthdayService', () => {
    let service;
    const dayToMs = 5 * 24 * 60 * 60 * 1000;
    beforeEach(() => {
        service = new BirthdayService();
        spyOn(service, 'log');
    });
    it('should log proper message, if it is birthday', async () => {
        await service.howLongToMyBirthday(new Date()).then(() => {
        });
        expect(service.log).toHaveBeenCalledWith('Hooray!!! It is today!');
    });
    it('should log proper message, if it is 5 days before', async () => {
        await service.howLongToMyBirthday(new Date(Date.now() - dayToMs + 1000)).then(() => {
        });
        expect(service.log).toHaveBeenCalledWith('Oh, you have celebrated it 5 day/s ago, don\'t you remember?');
    });
    it('should log proper message, if it is 5 days after', async () => {
        await service.howLongToMyBirthday(new Date(Date.now() + dayToMs + 1000)).then(() => {
        });
        expect(service.log).toHaveBeenCalledWith('Soon...Please, wait just 5 day/days');
    });
})