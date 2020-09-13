class Tooltip {
    element;
    static instance

    constructor() {
        if (Tooltip.instance) {
            return Tooltip.instance
        }
        Tooltip.instance = this
    }

    initialize() {
        this.initEventListener()
    }

    initEventListener() {
        document.addEventListener('pointerover', this.mouseOver)
        document.addEventListener('pointerout', this.mouseOut)
    }

    mouseOver = event => {
        const element = event.target.closest('[data-tooltip]')
        if (element) {
            this.render(element.dataset.tooltip)
            this.moveTooltip(event)
            document.addEventListener('pointermove', event => {
                this.moveTooltip(event)
            })
        }
    }

    mouseOut = () => {
        this.remove()
    }

    moveTooltip(event) {
       let left = event.clientX - 40
        let top = event.clientY + 10
        if (left < 0) left = 0;
        if (top > document.documentElement.clientHeight){
            top = event.clientY - 40
        }
        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
    }

    render(html) {
        this.element = document.createElement('div')
        this.element.className = 'tooltip'
        this.element.innerHTML = html
        document.body.append(this.element)
    }

    remove() {
        if (this.element) {
            this.element.remove()
        }
        document.removeEventListener('pointermove', this.moveTooltip)
    }

    destroy() {
       
        this.remove()
    }
}

const tooltip = new Tooltip();

export default tooltip;
