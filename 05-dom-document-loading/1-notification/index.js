export default class NotificationMessage {

    element;
    timer;
    static checkShow = false;

    constructor(message, { duration = 0, type = '' } = {}) {
        this.message = message
        this.duration = duration
        this.type = type

        this.render()
    }

    setShowed(showed) {
        NotificationMessage.checkShow = showed;
    }


    getTimer() {
        return (this.duration / 1000)
    }

    getTеmplate() {
        return `
            <div class="notification ${this.type}" style="--value:${this.getTimer()}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
                </div>
            </div>`
    }

    render() {
        const element = document.createElement('div')
        element.innerHTML = this.getTеmplate();
        this.element = element.firstElementChild
    }

    show(target = document.body) {
        target.append(this.element);
        if (NotificationMessage.checkShow) {
            clearTimeout(this.timer);
            this.remove();
        }
        this.setShowed(true);
        this.timerAdd();
    }

    timerAdd() {
        this.timer = setTimeout(() => {
            this.remove();
            this.setShowed(false);
        }, this.duration);
    }

    remove() {
        this.element.remove()
    }

    destroy() {
        this.remove()
    }
}

