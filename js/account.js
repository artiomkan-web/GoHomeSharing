'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    // -- Private -- \\
    let privateSection = document.querySelector('.private')

    // Private Tabs
    let privateTabsBtns = privateSection.querySelectorAll('.private__list-item'),
        privateTabsItems = privateSection.querySelectorAll('.private__content-item')

    privateTabsBtns.forEach(i => {
        i.addEventListener('click', (e)=>{
            for (let n = 0; n < privateTabsBtns.length; n++){
                if (e.target == privateTabsBtns[n] && !e.target.classList.contains('exit')){
                    privateTabsItems.forEach(i => i.classList.remove('active'))
                    privateTabsItems[n].classList.add('active')
                }
                if (e.target.classList.contains('exit')){
                    console.log('EXIT');
                }
            }
        })
    })

    // Private Dropdown

    let privateSectionDropdownItems = privateSection.querySelectorAll('.private__dropdown-item'),
        privateSectionDropdownTitles = privateSection.querySelectorAll('.private__dropdown__title')

    privateSectionDropdownTitles.forEach(i => { 
        i.addEventListener('click', ()=>{
            for (let n = 0; n < privateSectionDropdownTitles.length; n++){
                if (privateSectionDropdownTitles[n] == i){
                    privateSectionDropdownItems[n].classList.toggle('active')
                }
            }
        })
     })

    // Private History

    // Private Slider
    class Slider{
        constructor(slider){
            this.slider = slider
            this.row = slider.querySelector('.slider__row')
            this.items = slider.querySelectorAll('.slider__item')
            this.indents = getComputedStyle(this.slider).getPropertyValue('--indents').split('px')[0]*1
            this.quantity = getComputedStyle(this.slider).getPropertyValue('--quantity')*1
            this.prev = slider.querySelector('.slider__toggle.prev')
            this.next = slider.querySelector('.slider__toggle.next')
            this.dots = slider.querySelectorAll('.slider__dots-item')
            this.index = 0
            

            this.next.addEventListener('click', ()=>{
                this.index++
                this.toggleSlider()
            })
            
            this.prev.addEventListener('click', ()=>{
                this.index--
                this.toggleSlider()
            })

            if (this.dots){
                this.dots.forEach(dot => {
                    dot.addEventListener('click', (e)=>{
                        for (let n = 0; n < this.dots.length; n++){
                            if (this.dots[n] === e.target){
                                this.dots[n].classList.add('active')
                                this.index = n
                                this.toggleSlider()
                            }
                            else{
                                this.dots[n].classList.remove('active')
                            }
                        }
                    })
                })
            }
        }

        toggleSlider(){
            if (this.index > this.items.length - this.quantity){
                this.index = 0
            }
            if (this.index < 0){
                this.index = this.items.length - this.quantity
            }
            // console.log(`calc(${-this.index}*((100% - ${this.indents}px)/${this.quantity}) )`);
            console.log(this.items[0].offsetWidth);
            this.row.style.left = -this.index*(this.items[0].offsetWidth + this.indents) + 'px'

            this.dots.forEach(i => {i.classList.remove('active')})
            this.dots[this.index].classList.add('active')
        }

    }
    let privateSliders = document.querySelectorAll('.slider')
    
    privateSliders.forEach(i => {new Slider(i)})


    function mediaQueries() {
        if (window.matchMedia('(max-width: 640px)').matches){
            
        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    }
    
    mediaQueries()
})