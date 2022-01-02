'use strict'
window.addEventListener('DOMContentLoaded', ()=> {
    // Startpage City
    let startpageCity = document.querySelector('.startpage__city'),
    startpageCityTitle = startpageCity.querySelector('.startpage__city__title'),
    startpageCityList = startpageCity.querySelector('.startpage__city__list'),
    startpageCityListItems = startpageCity.querySelectorAll('.startpage__city__list-item')

    startpageCityTitle.addEventListener('click', ()=>{
    startpageCity.classList.toggle('active')
    })
    document.body.addEventListener('click', (e)=>{
    if (e.target.classList[0]){
        if (!(e.target.classList[0].includes('startpage__city'))) {
            startpageCity.classList.remove('active')
        }
    }

    })
    startpageCityListItems.forEach(i => {
    i.addEventListener('click', ()=>{
        startpageCityTitle.querySelector('span').textContent = i.textContent
        startpageCity.classList.toggle('active')
    })
    })

    // Startpage Type [class]
    class StartpageType{
    constructor(buttons){
        this.buttons = buttons

        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.buttons.forEach(i => i.classList.remove('active'))
                button.classList.add('active')
            })
        })
    }
    chooseType(){

    }
    }
    // let startpagePriceType = new StartpageType(document.querySelectorAll('.startpage__filter__price__list-item'))

    // Startpage Subway
    let startpageSubway = document.querySelector('.startpage__subway'),
    startpageSubwayTitle = startpageSubway.querySelector('.startpage__subway__title'),
    startpageSubwayList = startpageSubway.querySelector('.startpage__subway__list'),
    startpageSubwayListItems = startpageSubway.querySelectorAll('.startpage__subway__list-item')

    startpageSubwayTitle.addEventListener('click', ()=>{
    startpageSubway.classList.toggle('active')
    })
    document.body.addEventListener('click', (e)=>{
    if (e.target.classList[0]){
        if (!(e.target.classList[0].includes('startpage__subway'))) {
            startpageSubway.classList.remove('active')
        }
    }

    })
    startpageSubwayListItems.forEach(i => {
    i.addEventListener('click', ()=>{
        startpageSubwayTitle.textContent = i.textContent
        startpageSubway.classList.toggle('active')
    })
    })

    // Startpage Filter Tabs
    let startpageFilterBtns = document.querySelectorAll('.startpage__filter__price__list-item'),
        startpageFilterItems = document.querySelectorAll('.startpage__filter__data ')

    startpageFilterBtns.forEach(i => {
        i.addEventListener('click', ()=>{
            for (let n = 0; n < startpageFilterBtns.length; n++){
                if (startpageFilterBtns[n] == i){
                    startpageFilterBtns[n].classList.add('active')
                    startpageFilterItems[n].classList.add('active')
                }
                else{
                    startpageFilterBtns[n].classList.remove('active')
                    startpageFilterItems[n].classList.remove('active')
                }
            }
        })
    })
    // Startpage Dropdown List / Types
    let startpageDropdowns = document.querySelectorAll('.dropdown')

    startpageDropdowns.forEach(i => {
    i.querySelector('.dropdown__title').addEventListener('click', ()=>{
        i.classList.toggle('active')
    })
    i.querySelectorAll('.dropdown__list-item').forEach(item => {
        item.addEventListener('click', ()=>{
            item.classList.toggle('active')
        })
    })
    })

    // Startpage Additionally
    let startpageAdditionalListItems = document.querySelectorAll('.startpage__filter__additional__list-item')

    startpageAdditionalListItems.forEach(i => {i.addEventListener('click', (e)=> {
    i.classList.toggle('active')
    })})

    // Startpage Timeк
    let startpageTimerClock = document.querySelector('.startpage__timer__clock'),
        startpageTimerLine = document.querySelector('.startpage__timer__all-line'),
        startpageTimerCircle = document.querySelector('.startpage__timer__all-line__circle')

    startpageTimerCircle.setAttribute('r', getComputedStyle(startpageTimerLine).width.split('px')[0]/2)

    let startpageTimerCircleRadius = startpageTimerCircle.r.baseVal.value,
        startpageTimerCircleCircumference = parseInt(2 * Math.PI * startpageTimerCircleRadius + 1),
        startpageTimerIndex = 100

    
    startpageTimerCircle.style.strokeDasharray = `${startpageTimerCircleCircumference} ${startpageTimerCircleCircumference}`
    startpageTimerCircle.style.strokeDashoffset = startpageTimerCircleCircumference
    
    function startpageTimerProgress(percent) {
        let offset = startpageTimerCircleCircumference - percent / 100 * startpageTimerCircleCircumference
        
        startpageTimerCircle.style.strokeDashoffset  = offset
    }
    startpageTimerProgress(0)

    setInterval(()=>{
        let nowDate = moment(Date.now())._d,
            nextDate = moment(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0))._d
        
        let time = (+nextDate - +nowDate) / 1000,
            hours = Math.floor((time/3600)%24),
            minutes = Math.floor((time / 60)%60),
            seconds = Math.floor((time % 60))
        
        seconds = addNull(seconds)
        minutes = addNull(minutes)

        startpageTimerClock.textContent = hours + ':' + minutes + ':' + seconds

        if (startpageTimerIndex > 0){
            startpageTimerIndex -= 5
            startpageTimerProgress(time / (24 * 3600) * 100)
        }

    }, 1000)

    function addNull(value) {
        if (value.toString().length < 2){
            value = '0' + value
        }
        return value
    }


    // Startpage Booking
    class Calendar{
        constructor(element, activeDate = new Date(), minDuration = 0){
            this.element = element
            this.date = new Date()
            this.activeDate = activeDate
            this.minDuration = minDuration
            this.months = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ]
            this.monthsTitles = [
                'Января',
                'Февраля',
                'Марта',
                'Апреля',
                'Мая',
                'Июня',
                'Июля',
                'Августа',
                'Сентября',
                'Октября',
                'Ноября',
                'Декабря'
            ]


            if (this.element.querySelector('.calendar__actual-time')){
                this.element.querySelector('.calendar__timepicker').value = this.beautyValue(new Date().getHours()+1) + ':00'
                this.element.querySelector('.calendar__actual-time').addEventListener('click', () => {
                    let hours = this.beautyValue(new Date().getHours()),
                        minutes = this.beautyValue(new Date().getMinutes())
                    
                    this.element.querySelector('.calendar__timepicker').value = hours + ':' + minutes
                    this.element.querySelector('.calendar__btn__time').innerHTML = hours + ':' + minutes
                })
            }
            if (this.element.querySelector('.calendar__actual-date')){
                this.element.querySelector('.calendar__actual-date').addEventListener('click', () => {
                    this.renderCalendar(this.element)
                    this.activeDate.setDate(new Date().getDate())
                    this.activeDate.setMonth(new Date().getMonth())
                    this.activeDate.setFullYear(new Date().getFullYear())
                    this.element.querySelector('.calendar__date>p').innerHTML = this.beautyValue(this.activeDate.getDate()) + ' ' + this.beautyValue(this.monthsTitles[this.activeDate.getMonth()]) + ' ' + this.activeDate.getFullYear()
                    this.element.querySelector('.calendar__btn__date').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
                    this.correctTime()
                })
            }
            if (this.element.querySelector('.calendar__timepicker')){
                this.element.querySelector('.calendar__timepicker').addEventListener('input', (e) => {
                    this.element.querySelector('.calendar__btn__time').innerHTML = e.target.value
                    this.correctTime()
                })
            }

            this.element.querySelector('.calendar__prev').addEventListener('click', ()=>{
                this.date.setMonth(this.date.getMonth()-1)
                this.activeDate.setMonth(this.date.getMonth()-1)
                this.activeDate.setFullYear(this.date.getFullYear())
                if (this.activeDate.getMonth() > new Date().getMonth() - 2 || this.activeDate.getFullYear() > new Date().getFullYear()){
                    this.renderCalendar(this.element)
                }
                else{
                    this.date.setMonth(new Date().getMonth())
                    this.activeDate.setMonth(new Date().getMonth())
                }
            })
            this.element.querySelector('.calendar__next').addEventListener('click', ()=>{
                this.date.setMonth(this.date.getMonth()+1)
                this.activeDate.setMonth(this.date.getMonth()-1)
                this.renderCalendar(this.element)
            })
            
            element.querySelector('.calendar__btn__date').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
            
            if (element.querySelector('.calendar__btn__time')){
                element.querySelector('.calendar__btn__time').innerHTML = (this.activeDate.getHours()+1) + ':00'
            }

            this.renderCalendar(this.element)
        }
        renderCalendar(element){
            this.date.setDate(1)
            this.monthDays = element.querySelector('.calendar__days')
            this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
            this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()
            this.firstDayIndex = this.date.getDay()
            this.lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay()
            this.nextDays = 7 - this.lastDayIndex - 1
            this.days = ''
            
            element.querySelector('.calendar__date>span').innerHTML = this.months[this.date.getMonth()]
            element.querySelector('.calendar__date>p').innerHTML = new Date().getDate() + ' ' + this.monthsTitles[new Date().getMonth()] + ' ' + new Date().getFullYear()

            for (let x = this.firstDayIndex - 1 + this.minDuration; x > 0; x--){
                this.days += `<div class="calendar__prev-date">${this.prevLastDay - x + 1 }</div>`
            }
            
            for (let n = 1; n <= this.lastDay; n++){
                if (n === new Date().getDate() && this.date.getMonth() === new Date().getMonth()){
                    this.days += `<div class="active">${n + this.minDuration}</div>`
                }
                else{
                    this.days += `<div>${n + this.minDuration}</div>`
                }
            }
        
            for (let j = 1; j <= this.nextDays + 1; j++){
                this.days += `<div class="calendar__next-date">${j}</div>`
                this.monthDays.innerHTML = this.days
            }
     
            this.days = element.querySelectorAll('.calendar__days>div')
            
            this.days.forEach(i => {
                if (i.textContent*1 < new Date().getDate() + this.minDuration && this.date.getMonth() == new Date().getMonth() && this.date.getFullYear() == new Date().getFullYear()){
                    i.classList.add('calendar__prev-date')
                }
            })
    
            this.days.forEach(i => {
                i.addEventListener('click', (e)=>{
                    if (!(i.classList.contains('calendar__prev-date') && i.classList.contains('calendar__next-date'))){
                        this.days.forEach(item => {item.classList.remove('active')})
                        i.classList.add('active')
                        element.querySelector('.calendar__date>p').innerHTML = i.textContent + ' ' + this.monthsTitles[this.date.getMonth()] + ' ' + this.date.getFullYear()
                        this.activeDate.setDate(i.textContent)
                        this.activeDate.setMonth(this.date.getMonth())
                        this.activeDate.setFullYear(this.date.getFullYear())
                        element.querySelector('.calendar__btn__date').innerHTML = this.beautyValue(this.activeDate.getDate()) + '.' + this.beautyValue((this.activeDate.getMonth() + 1)) + '.' + this.activeDate.getFullYear()
                        this.correctTime()
                    }
                })
            })
        }
        beautyValue(value) {
            if (value.toString().length < 2){
                value = '0' + value
            }
            return value
        }
        correctTime(){
            let nowDate = new Date().getDate() + ':' + new Date().getMonth() + ':' + new Date().getFullYear(),
                activeDate = this.activeDate.getDate() + ':' + this.activeDate.getMonth() + ':' + this.activeDate.getFullYear(),
                nowHours = new Date().getHours(),
                activeHours = null,
                nowMinutes = new Date().getMinutes(),
                activeMinutes = null

            if (this.element.querySelector('.calendar__timepicker')){
                activeHours = this.element.querySelector('.calendar__timepicker').value.split(':')[0]*1
                activeMinutes = this.element.querySelector('.calendar__timepicker').value.split(':')[1]*1
            }
                
            if (nowDate == activeDate && activeHours <= nowHours && activeMinutes < nowMinutes){
                this.element.querySelector('.calendar__timepicker').value = nowHours + ':' + nowMinutes
                this.element.querySelector('.calendar__btn__time').innerHTML = nowHours + ':' + nowMinutes
            }
            
            else if (nowDate == activeDate && activeHours < nowHours){
                this.element.querySelector('.calendar__timepicker').value = nowHours + ':' + nowMinutes
                this.element.querySelector('.calendar__btn__time').innerHTML = nowHours + ':' + nowMinutes
            }

            else{

            }
        }
    }

    let startpageBookingMinsData = {
            start: +new Date().setHours(new Date().getHours() + 1, 0),
            end: +new Date().setHours(new Date().getHours() + 1, 30),
            interval: 1,
            duration: 30,
            min: 30
        },
        startpageBookingMins = document.querySelector('.startpage__filter__data.mins'),
        startpageBookingMinsStartAdd = startpageBookingMins.querySelector('.time_start>.clock__btn.add'),
        startpageBookingMinsStartRemove = startpageBookingMins.querySelector('.time_start>.clock__btn.remove'),
        startpageBookingMinsEndAdd = startpageBookingMins.querySelector('.time_end>.clock__btn.add'),
        startpageBookingMinsEndRemove = startpageBookingMins.querySelector('.time_end>.clock__btn.remove'),
        startpageBookingMinsStartHours = startpageBookingMins.querySelector('.time_start>.clock__value>.clock__hours'),
        startpageBookingMinsStartMinutes = startpageBookingMins.querySelector('.time_start>.clock__value>.clock__minutes'),
        startpageBookingMinsEndHours = startpageBookingMins.querySelector('.time_end>.clock__value>.clock__hours'),
        startpageBookingMinsEndMinutes = startpageBookingMins.querySelector('.time_end>.clock__value>.clock__minutes'),
        startpageBookingMinsDuration = startpageBookingMins.querySelector('.time_duration'),
        startpageBookingMinsCalendar = startpageBookingMins.querySelector('.calendar'),


        startpageBookingHoursData = {
            start: +new Date().setHours(new Date().getHours() + 1, 0),
            end: +new Date().setHours(new Date().getHours() + 2, 0),
            interval: 1,
            duration: 1,
            min: 1
        },
        startpageBookingHours = document.querySelector('.startpage__filter__data.hours'),
        startpageBookingHoursStartAdd = startpageBookingHours.querySelector('.time_start>.clock__btn.add'),
        startpageBookingHoursStartRemove = startpageBookingHours.querySelector('.time_start>.clock__btn.remove'),
        startpageBookingHoursEndAdd = startpageBookingHours.querySelector('.time_end>.clock__btn.add'),
        startpageBookingHoursEndRemove = startpageBookingHours.querySelector('.time_end>.clock__btn.remove'),
        startpageBookingHoursStartHours = startpageBookingHours.querySelector('.time_start>.clock__value>.clock__hours'),
        startpageBookingHoursStartMinutes = startpageBookingHours.querySelector('.time_start>.clock__value>.clock__minutes'),
        startpageBookingHoursEndHours = startpageBookingHours.querySelector('.time_end>.clock__value>.clock__hours'),
        startpageBookingHoursEndMinutes = startpageBookingHours.querySelector('.time_end>.clock__value>.clock__minutes'),
        startpageBookingHoursDuration = startpageBookingHours.querySelector('.time_duration'),
        startpageBookingHoursCalendar = startpageBookingHours.querySelector('.calendar')

    
    // hours
    function startpageBookingHoursDurationControl() {
        startpageBookingHoursData.duration = (startpageBookingHoursData.end - startpageBookingHoursData.start) / 1000 / 3600        
        return startpageBookingMinsData.duration
    }; startpageBookingHoursDurationControl()
    startpageBookingHoursStartAdd.addEventListener('click', ()=> {
        startpageBookingHoursData.start += startpageBookingHoursData.interval * 1000 * 3600
        startpageBookingHoursDurationControl()
        if (startpageBookingHoursData.duration < 1){
            startpageBookingHoursData.end += startpageBookingHoursData.interval * 1000 * 3600
            startpageBookingHoursDurationControl()
            
            if (moment(startpageBookingHoursData.end)._d.getHours() == 0 && moment(startpageBookingHoursData.end)._d.getMinutes() == 0){
                startpageBookingHoursData.end -= startpageBookingHoursData.interval * 100 * 3600
                startpageBookingHoursData.start -= startpageBookingHoursData.interval * 100 * 3600
                startpageBookingHoursDurationControl()
            }
        }
        
        showHoursResults()
    })
    startpageBookingHoursStartRemove.addEventListener('click', ()=> {
        startpageBookingHoursData.start -= startpageBookingHoursData.interval * 1000 * 3600
        startpageBookingHoursDurationControl()
        if (moment(startpageBookingHoursData.start)._d.getHours() > moment(startpageBookingHoursData.end)._d.getHours()){
            startpageBookingHoursData.start = startpageBookingHoursData.end - (startpageBookingHoursData.duration-1)*startpageBookingHoursData.interval * 1000 * 3600
            startpageBookingHoursDurationControl()
        }
        
        showHoursResults()
    })
    startpageBookingHoursEndAdd.addEventListener('click', ()=>{
        startpageBookingHoursData.end += startpageBookingHoursData.interval * 1000 * 3600
        startpageBookingHoursDurationControl()
        if (moment(startpageBookingHoursData.start)._d.getHours() + startpageBookingHoursData.duration > 24){
            startpageBookingHoursData.end = (startpageBookingHoursData.start + (startpageBookingHoursData.duration-1)*startpageBookingHoursData.interval * 1000 * 3600)
            startpageBookingHoursDurationControl()
        }
        
        showHoursResults()
    })
    startpageBookingHoursEndRemove.addEventListener('click', ()=>{
        startpageBookingHoursData.end -= startpageBookingHoursData.interval * 1000 * 3600
        startpageBookingHoursDurationControl()
        if (startpageBookingHoursData.duration < 1){
            startpageBookingHoursData.end += startpageBookingHoursData.interval * 1000 * 3600
            startpageBookingHoursDurationControl()
        }
        showHoursResults()
    })
    function showHoursResults() {
        let startHours = moment(startpageBookingHoursData.start)._d.getHours(),
            startMinutes = moment(startpageBookingHoursData.start)._d.getMinutes(),
            endHours = moment(startpageBookingHoursData.end)._d.getHours(),
            endMinutes = moment(startpageBookingHoursData.end)._d.getMinutes()
        
        if (startMinutes.toString().length < 2){
            startMinutes = '0' + startMinutes
        }
        if (endMinutes.toString().length < 2){
            endMinutes = '0' + endMinutes
        }

        startpageBookingHoursStartHours.innerHTML = startHours
        startpageBookingHoursStartMinutes.innerHTML = startMinutes
        startpageBookingHoursEndHours.innerHTML = endHours
        startpageBookingHoursEndMinutes.innerHTML = endMinutes
        startpageBookingHoursDuration.innerHTML = startpageBookingHoursData.duration
    }; showHoursResults() 
    // days

    let startpageBookingCalendarDaysEnd = new Date()
    
    startpageBookingCalendarDaysEnd.setDate((new Date().getDate()+1))
    
    let startpageBookingCalendars = [
        [document.querySelector('.startpage__filter__data.mins>.calendar')],
        [document.querySelector('.startpage__filter__data.hours>.calendar')],
        [document.querySelector('.startpage__filter__data.days>.calendar.start')],
        [document.querySelector('.startpage__filter__data.days>.calendar.end'), startpageBookingCalendarDaysEnd, 1]
    ]

    startpageBookingCalendars.forEach(i => {
        new Calendar(i[0], i[1], i[2])
        i[0].querySelector('.calendar__btn').addEventListener('click', ()=>{
            i[0].classList.toggle('active')
        })
        
        $(document).mouseup(function (e) {
            var container = $(i[0]);
            if (container.has(e.target).length === 0){
                container.removeClass('active')
            }
        });
    })

    // date 
    let startpageBookingHoursDate = new Date($.now()),
        startpageBookingHoursCalendarBtn = startpageBookingHoursCalendar.querySelector('.calendar__btn')

    $(startpageBookingHoursCalendarBtn).val(startpageBookingHoursDate.toLocaleDateString())
    $(startpageBookingHoursCalendarBtn).datepicker({
        minDate: startpageBookingHoursDate,
        onSelect: function (date, datepicker) {
            if (date != "") {
                startpageBookingHoursCalendarBtn.value = date
            }
        }
    });

    // mins
    function startpageBookingMinsDurationControl() {
        startpageBookingMinsData.duration = (startpageBookingMinsData.end - startpageBookingMinsData.start) / 1000 / 60
        
        return startpageBookingMinsData.duration
    }; startpageBookingMinsDurationControl()
    startpageBookingMinsStartAdd.addEventListener('click', ()=> {
        startpageBookingMinsData.start += startpageBookingMinsData.interval * 1000 * 60
        startpageBookingMinsDurationControl()
        if (startpageBookingMinsData.duration < 30){
            // startpageBookingMinsData.start -= startpageBookingMinsData.interval * 1000 * 60
            startpageBookingMinsData.end += startpageBookingMinsData.interval * 1000 * 60
            startpageBookingMinsDurationControl()
            
            if (moment(startpageBookingMinsData.end)._d.getHours() == 0 && moment(startpageBookingMinsData.end)._d.getMinutes() == 0){
                startpageBookingMinsData.end -= startpageBookingMinsData.interval * 1000 * 60
                startpageBookingMinsData.start -= startpageBookingMinsData.interval * 1000 * 60
                startpageBookingMinsDurationControl()
            }
        }
        
        showMinutesResults()
    })
    startpageBookingMinsStartRemove.addEventListener('click', ()=> {
        startpageBookingMinsData.start -= startpageBookingMinsData.interval * 1000 * 60
        startpageBookingMinsDurationControl()
        if (moment(startpageBookingMinsData.start)._d.getHours() == 23 && moment(startpageBookingMinsData.start)._d.getMinutes() == 59){
            startpageBookingMinsData.start += startpageBookingMinsData.interval * 1000 * 60
            startpageBookingMinsDurationControl()
        }
        // if (startpageBookingMinsData.start < Date.now()){
        //     startpageBookingMinsData.start += startpageBookingMinsData.interval * 1000 * 60
        //     startpageBookingMinsDurationControl()
        // }
        
        showMinutesResults()
    })
    startpageBookingMinsEndAdd.addEventListener('click', ()=>{
        startpageBookingMinsData.end += startpageBookingMinsData.interval * 1000 * 60
        startpageBookingMinsDurationControl()
        if (moment(startpageBookingMinsData.end)._d.getHours() == 0 && moment(startpageBookingMinsData.end)._d.getMinutes() == 0){
            startpageBookingMinsData.end -= startpageBookingMinsData.interval * 1000 * 60
            startpageBookingMinsDurationControl()
        }
        
        showMinutesResults()
    })
    startpageBookingMinsEndRemove.addEventListener('click', ()=>{
        startpageBookingMinsData.end -= startpageBookingMinsData.interval * 1000 * 60
        startpageBookingMinsDurationControl()
        if (startpageBookingMinsData.duration < 30){
            startpageBookingMinsData.end += startpageBookingMinsData.interval * 1000 * 60
            startpageBookingMinsDurationControl()
            alert('Минимальное время: 30 минут');
        }

        
        showMinutesResults()
    })
    function showMinutesResults() {
        let startHours = moment(startpageBookingMinsData.start)._d.getHours(),
            startMinutes = moment(startpageBookingMinsData.start)._d.getMinutes(),
            endHours = moment(startpageBookingMinsData.end)._d.getHours(),
            endMinutes = moment(startpageBookingMinsData.end)._d.getMinutes()
        
        if (startMinutes.toString().length < 2){
            startMinutes = '0' + startMinutes
        }
        if (endMinutes.toString().length < 2){
            endMinutes = '0' + endMinutes
        }

        startpageBookingMinsStartHours.innerHTML = startHours
        startpageBookingMinsStartMinutes.innerHTML = startMinutes
        startpageBookingMinsEndHours.innerHTML = endHours
        startpageBookingMinsEndMinutes.innerHTML = endMinutes
        startpageBookingMinsDuration.innerHTML = startpageBookingMinsData.duration

        
    }; showMinutesResults()
    // date
    let startpageBookingMinsDate = new Date($.now()),
        startpageBookingMinsCalendarBtn = startpageBookingMinsCalendar.querySelector('.startpage__filter__data-item.calendar>.calendar__btn')

    $(startpageBookingMinsCalendarBtn).val(startpageBookingMinsDate.toLocaleDateString())
    $(startpageBookingMinsCalendarBtn).datepicker({
    minDate: startpageBookingMinsDate,
    onSelect: function (date, datepicker) {
            if (date != "") {
                startpageBookingMinsCalendarBtn.name = date
                // alert("Selected Date: " + date);
            }
        }
    });
    

    // =============================================================================
    // =============================================================================
    // =============================================================================

    // Apartments List Slider
    class Slider{
        constructor(slider, interval = 0){
            this.slider = slider
            this.row = slider.querySelector('.slider__row')
            this.items = slider.querySelectorAll('.slider__item')
            this.indents = getComputedStyle(this.slider).getPropertyValue('--indents').split('px')[0]*1
            this.quantity = getComputedStyle(this.slider).getPropertyValue('--quantity')*1
            this.prev = slider.querySelector('.slider__toggle.prev')
            this.next = slider.querySelector('.slider__toggle.next')
            this.dots = slider.querySelectorAll('.slider__dots-item')
            this.index = 0
            this.interval = interval
            
            if (this.next){
                this.next.addEventListener('click', ()=>{
                    this.index++
                    this.toggleSlider()
                })
            }
            
            if (this.prev){
                this.prev.addEventListener('click', ()=>{
                    this.index--
                    this.toggleSlider()
                })
            }

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

            if (this.interval > 0){
                    setInterval(()=>{
                        this.index++
                        this.toggleSlider()
                    }, this.interval)
            }
        }

        toggleSlider(){
            if (this.index > this.items.length - this.quantity){
                this.index = 0
            }
            if (this.index < 0){
                this.index = this.items.length - this.quantity
            }

            if (this.dots){
                this.dots.forEach(i => {i.classList.remove('active')})
                this.dots[this.index].classList.add('active')
            }
            this.row.style.left = -this.index*(this.items[0].offsetWidth + this.indents) + 'px'
        }

    }
    let apartmentsListSliders = document.querySelectorAll('.apartments__item__slider')
    apartmentsListSliders.forEach(i => {new Slider(i)})

    // Apartments Likes
    let apartmentsLikeBtns = document.querySelectorAll('.apartments__item__favorite')
        
    apartmentsLikeBtns.forEach(i => {
        i.addEventListener('click', ()=>{
            i.classList.toggle('active')
        })
    })

    // Map/list
    let apartments = document.querySelector('.apartments'),
        map = document.querySelector('.apartments__map'),
        mapTop = apartments.offsetTop,
        resultsTypeItems = document.querySelectorAll('.show-type'),
        resultsTypeStatus = 'list',
        resultsTypeToggleBtn = document.querySelector('.startpage__results-item.type_toggle')

    resultsTypeToggleBtn.addEventListener('click', ()=>{
        if (resultsTypeStatus == 'list'){
            resultsTypeToggleBtn.textContent = 'Список'
            resultsTypeStatus = 'map'
            resultsTypeItems[0].classList.add('active')
            resultsTypeItems[1].classList.remove('active')
            map.style.marginTop = -mapTop + 'px'
            apartments.style.padding = '0'
        }
        else {
            resultsTypeStatus = 'list'
            resultsTypeToggleBtn.textContent = 'На карте'
            resultsTypeItems[0].classList.remove('active')
            resultsTypeItems[1].classList.add('active')
            apartments.style.padding = ''
        }
    })

    // Map

    // Work Slider
    let workSteps= document.querySelector('.work__steps')
    let workStepsSlider = new Slider(workSteps, 5000)

    function mediaQueries() {
        if (window.matchMedia('(max-width: 768px)').matches){
            // Startpage Dropdown Filter
            let startpageFilter = document.querySelector('.startpage__filter'),
                startpageFilterTitle = document.querySelector('.startpage__filter__title'),
                startpageFilterList = document.querySelector('.startpage__filter__list')

                startpageFilterTitle.addEventListener('click', ()=>{
                    startpageFilter.classList.toggle('active')
                })
                startpageFilterList.insertAdjacentElement('afterbegin', startpageSubway)
            // Apartments Slider
            let apartments = document.querySelector('.apartments'),
                apartmentsSlider = apartments.querySelector('.apartments__list'),
                apartmentsSliderRow = apartments.querySelector('.apartments__list-container'),
                apartmentsSliderItems = apartments.querySelectorAll('.apartments__item'),
                apartmentsSliderPrev = apartments.querySelector('.apartments__toggle-btn.prev'),
                apartmentsSliderNext = apartments.querySelector('.apartments__toggle-btn.next'),
                apartmentsSliderIndents = getComputedStyle(apartmentsSlider).getPropertyValue('--indents').split('px')[0],
                apartmentsSliderIndex = 0;

            function apartmentsSliderToggler() {
                if (apartmentsSliderIndex < 0){
                    apartmentsSliderIndex = apartmentsSliderItems.length - 1
                }
                if (apartmentsSliderIndex > apartmentsSliderItems.length - 1){
                    apartmentsSliderIndex = 0
                }
                // apartmentsSliderRow.style.left = -apartmentsSliderIndex*100 + '%'
                apartmentsSliderRow.style.left = `calc(${-apartmentsSliderIndex*100}% - ${apartmentsSliderIndex*apartmentsSliderIndents}px)`
            }
            apartmentsSliderPrev.addEventListener('click', ()=>{
                apartmentsSliderIndex--
                apartmentsSliderToggler()
            })
            apartmentsSliderNext.addEventListener('click', ()=>{
                apartmentsSliderIndex++
                apartmentsSliderToggler()
            })
        }
        if (window.matchMedia('(max-width: 480px)').matches){
            
        }
    }
    
    mediaQueries()
})