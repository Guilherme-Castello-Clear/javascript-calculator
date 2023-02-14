class CalcController{

    constructor(){

        this._operation = [];
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

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    addOperation(value){
        this._operation.push(value);
        console.log(this._operation);
    }


    setError(){

        this.displayCalc = "Error";

    }

    execBtn(value){
        switch(value){
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                
                break;
            case "subtracao":
                
                break;
            case "multiplicacao":
                
                break;
            case "divisao":
                
                break;
            case "porcento":
                
                break;
            case "igual":
                this.setError();
                break;
            case '0':
            case "1":
            case "2":
            case "3":                
            case "4":    
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
        
            }
    }


    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e =>{
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

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