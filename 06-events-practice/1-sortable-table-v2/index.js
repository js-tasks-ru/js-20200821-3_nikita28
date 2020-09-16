export default class SortableTable {
  element;

  constructor(header = [], {
    data = [],
    sorted = {
      id: header.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.header = header;
    this.data = data;
    this.sorted = sorted;

    this.render();
  }

  render() {
    const { id, order } = this.sorted;
    const element = document.createElement('div');
    const sortedData = this.sortData(id, order);
    element.innerHTML = this.template(sortedData);
    this.element = element.firstElementChild;
    this.subElements = this.subElements(element);

    this.initEventListeners();
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };
    if (column) {
      const { id, order } = column.dataset;
      const sortedData = this.sortData(id, toggleOrder(order));
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = toggleOrder(order);

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.dataHTML(sortedData);
    }
  };

  template() {
    return `
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.header.map(item => this.headerHTML(item)).join('')}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.dataHTML(this.data)}
          </div>
        </div>
    `;
  }
 
  headerHTML({ id, title, sortable }) {
    const order = this.sorted.id === id ? this.sorted.order : 'asc';

    return `
    <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
      <span>${title}</span>
      ${this.sortArrowElement(id)}
    </div>
  `;
  }

  sortArrowElement(id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`
      : '';
  }

  dataHTML(data) {
    return data.map(item => `
    <div class="sortable-table__row">
      ${this.rowHTML(item, data)}
    </div>`
    ).join('');
  }

  rowHTML(row) {
    const cells = this.header.map(({ id, template }) => {
      return {
        id,
        template
      };
    });
    return cells.map(({ id, template }) => {
      return template
        ? template(row[id]) : `<div class="sortable-table__cell">${row[id]}</div>`
    })
      .join('');
  }

  sortData(id, order) {
    const arr = [...this.data];
    const { sortType } = this.header.find(item => item.id === id);
    const direction = {
      asc: 1,
      desc: -1
    };
    if (sortType === 'string') {
      return arr.sort((row1, row2) =>
        direction[order] * row1[id].localeCompare(row2[id], ['ru'], { caseFirst: 'upper' })
      );
    }

    if (sortType === 'number') {
      return arr.sort((row1, row2) =>
        direction[order] * (row1[id] - row2[id])
      );
    }
  }

  subElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

  }
}

