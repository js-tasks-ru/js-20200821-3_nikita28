
export default class SortableTable {

  element;
  constructor(
    header = [],
    { data = [] } = {}) {
    this.header = header;
    this.data = data;
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template()
    this.element = element.firstElementChild;
    this.sortArrow = this.sortArrowElement();
    this.subElements = this.subElements();
    this.headerElements = this.sortableElements();
  }

  template() {
    return `
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.headerHTML()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.dataHTML(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  headerHTML() {
    return this.header.map(item => `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
      </div>`
    )
      .join('');
  }

  sortArrowElement() {
    const element = document.createElement('div');
    element.innerHTML = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
    return element.firstElementChild;
  }

  dataHTML(body) {
    return body.map(row => `
      <a href="/products/${row.id}" class="sortable-table__row">
        ${this.rowHTML(row)}
      </a>
    `)
      .join('');
  }

  rowHTML(row) {
    return this.header.map(column => {
      if (column.template) {
        return column.template(row.images);
      }
      return `<div class="sortable-table__cell">${row[column.id]}</div>`;
    })
      .join('');
  }

  sortableElements() {
    const subElements = this.element.querySelectorAll('.sortable-table__header > .sortable-table__cell');
    return [...subElements].reduce((accum, subElement) => {
      const columnData = this.header.find(column => column.id === subElement.dataset.id);
      if (!columnData.sortable) {
        return accum;
      }
      accum[subElement.dataset.id] = {
        'element': subElement,
        'sortType': columnData.sortType,
      };
      return accum;
    }, {});
  }

  sort(arr, param) {

    const direction = {
      asc: 1,
      desc: -1
    };
    let sortedData = [];

    if (this.headerElements[arr].sortType === 'string') {
     sortedData = [...this.data].sort((row1, row2) =>
        direction[param] * row1[arr].localeCompare(row2[arr], ['ru'], { caseFirst: 'upper' })
      );
    }

    if (this.headerElements[arr].sortType === 'number') {
      sortedData = [...this.data].sort((row1, row2) =>
        direction[param] * (row1[arr] - row2[arr])
      );
    }
    this.updateElements(arr, sortedData)
  }

  updateElements(arr, sortedData){
    this.subElements.body.innerHTML = this.dataHTML(sortedData);
    this.headerElements[arr].element.dataset.order = this.param;
    this.headerElements[arr].element.append(this.sortArrow);
  }

  subElements() {
    const subElements = this.element.querySelectorAll('[data-element]');
    return [...subElements].reduce((accum, subElement) => {
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
