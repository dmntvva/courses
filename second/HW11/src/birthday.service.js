class BirthdayService {
    constructor() {

    }
    howLongToMyBirthday(date) {
        const sixMonth = 182.5 * 24 * 60 * 60 * 1000;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const now = new Date();
                const birthday = date.toString() === 'Invalid Date' ? new Date(date) : date;
                if (
                    birthday.getDate() === now.getDate() &&
                    birthday.getMonth() === now.getMonth() &&
                    birthday.getYear() === now.getYear()
                ) {
                    resolve(this.congratulateWithBirthday());
                } else {
                    if (birthday.toString() !== 'Invalid Date') {
                        const diff = birthday - now;
                        if (Math.abs(diff) < sixMonth) {
                            resolve(this.notifyWaitingTime(diff));
                        }
                    } else {
                        throw new Error('Wrong argument!');
                    }
                }
            }, 100)
        });
    }
    congratulateWithBirthday() {
        this.log('Hooray!!! It is today!');
    }
    notifyWaitingTime(time) {
        const dayToMs = 24 * 60 * 60 * 1000;
        const days = time / dayToMs;
        if (time > 0) {
            this.log(`Soon...Please, wait just ${Math.floor(days)} day/days`);
        } else {
            this.log(`Oh, you have celebrated it ${Math.abs(Math.floor(days))} day/s ago, don't you remember?`);
        }
    }
    log(text) {
        console.log(text);
    }
}
module.exports={
    BirthdayService
};

