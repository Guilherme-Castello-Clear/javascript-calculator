class CalcController{

    constructor(){

        this.locale = "pt-BR"
        this._displayCalcEL = document.querySelector("#display");
        this._dateCalcEL = document.querySelector("#data");
        this._timeCalcEL = document.querySelector("#hora");
        this._currentDate;
        this.inicialize();
        this.initButtonsEvents()
    }

    inicialize(){
        
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);

        

    }
    addEventListenerAll(element, event, f){

        event.split(" ").forEach(event => {
            element.addEventListener(event, f, false);
        });
            
    }
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e =>{
                console.log(btn.className.baseVal.replace("btn-", ""));
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown",e =>{

                btn.style.cursor = "pointer";

            })

        })

    }

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
        this.displayDate = this.currentDate.toLocaleDateString(this.locale);
    }

    get displayDate(){
        return this._dateCalcEL.innerHTML;
    }

    set displayDate(value){
        return this._dateCalcEL.innerHTML = value;
    }


    get displayTime(){
        return this._timeCalcEL.innerHTML;
    }

    set displayTime(value){
        return this._timeCalcEL.innerHTML = value;
    }

    get displayCalc(){

        return this._displayCalcEL.innerHTML;

    }

    set displayCalc(value){

        this._displayCalcEL.innerHTML = value;

    }








    get currentDate(){

        return new Date();

    }

    set currentDate(value){
        this._currentDate = value;
    }

}