
export default class DoubleSlider {
    element;
    subElements
    seleceted = { 
        from : 0,
        to : 0 
    }

    constructor({ min = 100,
        max = 200,
        selected = {},
        formatValue = value => '$' + value
    } = {}){

        this.min = min
        this.max = max
        this.selected = selected
        this.formatValue = formatValue

        this.render()
        this.initEventListeners()
    }

    render(){
        const element = document.createElement('div')
        element.innerHTML = this.template()
        this.element = document.firstElementChild

        this.subElements = this.getSubElements(element)
    }

    template(){
        return `
        <div class="range-slider">
    <span> {this.formatValue(this.min)}</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress" style="left: 0%; right: 0%"></span>
      <span class="range-slider__thumb-left" style="left: 0%"></span>
      <span class="range-slider__thumb-right" style="right: 0%"></span>
    </div>
    <span>{this.formatValue(this.max)}</span>
  </div>
  `
    }

    initEventListeners(){
        const {thumbleft , thumbRight} = this.subElements

        thumbleft.addEventListener('pointerdown' ,event => this.mouseDown(event))
        thumbRight.addEventListener('pointerdown' ,event => this.mouseDown(event))
    }

    mouseDown(){
        

    }

    



    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');
    
        return [...elements].reduce((accum, subElement) => {
          accum[subElement.dataset.element] = subElement;
    
          return accum;
        }, {});
      }

      remove(){
          this.element.remove()
      }

      destroy(){
          this.remove()
      }

}
