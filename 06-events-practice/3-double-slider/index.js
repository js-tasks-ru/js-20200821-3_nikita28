
export default class DoubleSlider {
    element;
    subElements;


    position = {
        thumb: null,
        maxValue: 0,
        sliderLeft: 0,
        sliderRight: 0,
        width: 0
    };

    constructor({ min = 100,
        max = 200,
        selected = {
            from: min,
            to: max
        },
        formatValue = value => '$' + value
    } = {}) {

        this.min = min
        this.max = max
        this.selected = selected
        this.formatValue = formatValue

        this.render()
        this.renderSelection()
        this.initEventListeners()
    }

    render() {
        const element = document.createElement('div')
        element.innerHTML = this.template()
        this.element = element.firstElementChild

        this.subElements = this.getSubElements(this.element)
    }

    renderSelection() {
        if (this.selected.from) {
            const styleLeft = (this.selected.from - this.min) / (this.max - this.min) * 100;
            this.subElements.thumbLeft.style.left = this.subElements.progress.style.left = `${styleLeft}%`;
        }
        if (this.selected.to) {
            const styleRight = (this.max - this.selected.to) / (this.max - this.min) * 100;
            this.subElements.thumbRight.style.right = this.subElements.progress.style.right = `${styleRight}%`;
        }
    }

    template() {
        const { from, to } = this.selected
        return `
        <div class="range-slider">
          <span data-element="from">${this.formatValue(from)}</span>
          <div data-element="inner" class="range-slider__inner">
            <span data-element="progress" class="range-slider__progress" style="left: 0; right: 0;"></span>
            <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: 0;"></span>
            <span data-element="thumbRight" class="range-slider__thumb-right" style="right: 0;"></span>
          </div>
          <span data-element="to">${this.formatValue(to)}</span>
        </div>
    ;`
    }

    initEventListeners() {
        this.subElements.thumbLeft.addEventListener('pointerdown', this.mouseDown);
        this.subElements.thumbRight.addEventListener('pointerdown', this.mouseDown);
    }

    mouseDown = event => {
        event.preventDefault();
        let maxValue = event.target === this.subElements.thumbLeft
            ? 100 - parseFloat(this.subElements.progress.style.right)
            : 100 - parseFloat(this.subElements.progress.style.left);

        this.position = {
            thumb: event.target,
            maxValue: maxValue,
            sliderLeft: this.subElements.inner.getBoundingClientRect().left,
            sliderRight: this.subElements.inner.getBoundingClientRect().right,
            width: this.subElements.inner.getBoundingClientRect().width,

        }
        document.addEventListener('pointermove', this.mouseMove);
        document.addEventListener('pointerup', this.mouseUp);
    }

    mouseMove = event => {
        const { thumb, sliderLeft, sliderRight, maxValue, width } = this.position;
        if (thumb === this.subElements.thumbLeft) {
            let newLeft = (event.clientX - sliderLeft) / width * 100

            if (newLeft < 0) newLeft = 0;

            if (newLeft > maxValue) {
                newLeft = maxValue
            }
            this.subElements.thumbLeft.style.left = this.subElements.progress.style.left = `${newLeft}%`
        }
        if (thumb === this.subElements.thumbRight) {
            let newRight = (sliderRight - event.clientX) / width * 100

            if (newRight < 0) newRight = 0;

            if (newRight > maxValue) {
                newRight = maxValue
            }
            this.subElements.thumbRight.style.right = this.subElements.progress.style.right = `${newRight}%`
        }
        this.update()
    }

    update() {
        const rangeWidth = this.max - this.min;
        this.selected.from = Math.round(this.min + parseFloat(this.subElements.progress.style.left) / 100 * rangeWidth);
        this.selected.to = Math.round(this.max - parseFloat(this.subElements.progress.style.right) / 100 * rangeWidth);

        this.subElements.from.innerHTML = this.formatValue(this.selected.from);
        this.subElements.to.innerHTML = this.formatValue(this.selected.to);
    }

    mouseUp = () => {
        const customEvent = new CustomEvent('range-select', { detail: this.selected, bubbles: true });
        this.element.dispatchEvent(customEvent);

        this.removeListeners();
    }

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    remove() {
        this.element.remove()
    }

    removeListeners() {
        document.removeEventListener('pointerup', this.mouseUp);
        document.removeEventListener('pointermove', this.mouseMove);
    }

    destroy() {
        this.remove()
    }
}