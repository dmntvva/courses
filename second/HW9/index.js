const max = 5;
const delay = 60000;
class Magazine {
    constructor() {
        this.state = new ReadyForPushNotification();
        this.staff = [];
        this.articles = [];
        this.followers = [];
    }
    changeState() {
        this.state = this.state.toNext();
    }
    addStaff(staff) {
        this.staff.push(staff);
    }
    addFollower(follower) {
        const f = this.followers.find((f) => {
            return f.name === follower.name;
        });

        if (f) {
            f.topic = [...f.topic, ...follower.topic];
        } else {
            this.followers.push(follower);
        }
    }
    unsubscribe(observer) {
        this.followers = this.followers.filter(el => {
            return el.name.name !== observer.name;
        });
    }
    addArticles(article) {
        this.articles.push(article);
        if (this.state.state === 'ReadyForPushNotification') {
            if (this.articles.length >= max) {
                this.changeState();
            }
        }
    }
    approve(name) {
        if (this.state.state === 'ReadyForApprove') {
            this.changeState();
            console.log(`Hello ${name}. You've approved the changes`);
        } else if (this.state.state === 'ReadyForPushNotification') {
            console.log(`Hello ${name}. You can't approve. We don't have enough of publications`);
        } else if (this.state.state === 'PublisInProgress') {
            console.log(`Hello ${name}. While we are publishing we can't do any actions`);
        } else if (this.state.state === 'ReadyForPublish') {
            console.log(`Hello ${name}. Publications have been already approved by you.`);
        }
    }
    publish(name) {
        if (this.state.state === 'ReadyForPublish') {
            this.changeState();
            this.notifyAll();
            setTimeout(() => {
                this.changeState();
            }, delay);
            console.log(`Hello ${name}. You've recently published publications`);
        } else if (this.state.state === 'ReadyForPushNotification') {
            console.log(`Hello ${name}. You can't publish. We are creating publications now.`);
        } else if (this.state.state === 'PublisInProgress') {
            console.log(`Hello ${name}. While we are publishing we can't do any actions.`);
        } else if (this.state.state === 'ReadyForApprove') {
            console.log(`Hello ${name}. You can't publish. We don't have a manager's approval.`);
        }
    }
    notifyAll() {
        this.followers.forEach((el) => {
            el.topic.forEach(element => {
                this.articles.filter((e) => {
                    return e.type === element;
                }).forEach((elem) => {
                    el.name.onUpdate(elem.text);
                })
            });
        })
    }
}
class States {
    constructor(state, nextState) {
        this.state = state;
        this.nextState = nextState;
    }
    toNext() {
        return new this.nextState();
    }
}
class ReadyForPushNotification extends States {
    constructor() {
        super('ReadyForPushNotification', ReadyForApprove);
    }
}
class ReadyForApprove extends States {
    constructor() {
        super('ReadyForApprove', ReadyForPublish);
    }
}
class ReadyForPublish extends States {
    constructor() {
        super('ReadyForPublish', PublisInProgress);
    }

}
class PublisInProgress extends States {
    constructor() {
        super('PublisInProgress', ReadyForPushNotification);
    }
}
class MagazineEmployee {
    constructor(name, type, magazine) {
        this.name = name;
        this.type = type;
        this.magazine = magazine;
        magazine.addStaff({ name, type });
    }
    addArticle(text) {
        this.magazine.addArticles({ type: this.type, text });
    }
    approve() {
        if (this.type === 'manager') {
            this.magazine.approve(this.name);
        } else {
            console.log('You do not have permissions to do it');
        }
    }
    publish() {
        if (this.type !== 'manager') {
            this.magazine.publish(this.name);
        } else {
            console.log('You do not have permissions to do it');
        }

    }
}
class Follower {
    constructor(name) {
        this.name = name;
        this.magazine;
    }
    subscribeTo(magazine, topic) {
        this.magazine = magazine;
        magazine.addFollower({
            name: this, topic: [topic]
        });
    }
    unsubscribe() {
        this.magazine.unsubscribe(this);
    }
    onUpdate(data) {
        console.log(`${data} ${this.name}`);
    }
}
const magazine = new Magazine();
const manager = new MagazineEmployee('Andrii', 'manager', magazine);
const sport = new MagazineEmployee('Serhii', 'sport', magazine);
const politics = new MagazineEmployee('Volodymyr', 'politics', magazine);
const general = new MagazineEmployee('Olha', 'general', magazine);

const iryna = new Follower('Iryna');
const maksym = new Follower('Maksym');
const mariya = new Follower('Mariya');


iryna.subscribeTo(magazine, 'sport');
maksym.subscribeTo(magazine, 'politics');
mariya.subscribeTo(magazine, 'politics');
mariya.subscribeTo(magazine, 'general');
sport.addArticle('something about sport');
politics.addArticle('something about politics');
general.addArticle('some general information');
politics.addArticle('something about politics again');
sport.approve() //you do not have permissions to do it
manager.approve();//Hello Andrii. You can't approve. We don't have enough of publications
politics.publish(); //Hello Volodymyr. You can't publish. We are creating publications now.
sport.addArticle('news about sport');
manager.approve(); //Hello Andrii. You've approved the changes
sport.publish(); //Hello Serhii. You've recently published publications.
/*
something about sport Iryna
news about sport Iryna
something about politics Maksym
something about politics Mariya
something about politics again Maksym
something about politics again Mariya
some general information Mariya
*/
manager.approve('news about sport'); //Hello Andrii. While we are publishing we can't do any actions

