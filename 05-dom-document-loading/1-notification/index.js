export default class NotificationMessage {

    element;
    static actualNotification;

    constructor(message, { duration = 0, type = '' } = {}) {

        if (NotificationMessage.actualNotification) {
            NotificationMessage.actualNotification.remove();
        }

        this.message = message
        this.duration = duration
        this.type = type

        this.render()
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
        element.innerHTML = this.getTеmplate()
        this.element = element.firstElementChild
        NotificationMessage.actualNotification = this.element;

    }

    show(target = document.body) {
        target.append(this.element);
        this.timerAdd();
    }

    timerAdd() {
        setTimeout(() => {
            this.remove();
        }, this.duration);

    }

    remove() {
        this.element.remove()
    }

    destroy() {
        this.remove()
    }
}

