export default class ColumnChart {
    chartHeight = 50;
    element;

    constructor({ data = [], label = '', value = '', link = '' } = {}) {
        this.data = data
        this.label = label
        this.value = value
        this.link = link
        this.render()
    }

    getChartBody() {
        const maxValue = Math.max(...this.data);
        const result = this.data.map(item => {
            const scale = Math.floor(item / maxValue * this.chartHeight);
            const percent = (item / maxValue * 100).toFixed(0);
            return `<div style="--value: ${scale}" data-tooltip="${percent}%"></div>`;
        });
        return result.join('');
    }

    template() {
        return `
    <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
            Total ${this.label}
            ${this.getLink()}
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
                ${this.value}
            </div>
            <div data-element="body" class="column-chart__chart">
                ${this.getChartBody()}
            </div>
        </div>
    </div>
    `
    }
    getLink() {
        if (!this.link) {
            return ''
        }
        return `<a class="column-chart__link" href="${this.link}">View all</a>`;
    }

    render() {
        const element = document.createElement('div')
        element.innerHTML = this.template()
        this.element = element.firstElementChild // Отбрасываем внешний div
        if (this.data.length) {
            this.element.classList.remove('column-chart_loading');
        }
    }

    update(data) {// Метод обновление данных
        this.data = data; // Обновление данных в объекте
        const chatElement = this.element.querySelector('.column-chart__chart');// Поиск дом элемента для обновление данных
        chatElement.innerHTML = this.getChartBody(); // обновление данных
    }

    remove() {
        this.element.remove()
    }

    destroy() {
        this.remove()
    }
}