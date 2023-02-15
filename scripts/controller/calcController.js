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

    getLastOperation(){

        return this._operation[this._operation.length - 1];

    }

    isOperator(value){

        return (['+', "-", "*", "%", "/"].indexOf(value) > -1)

    }


    setLastOperation(newValue){
        this._operation[(this._operation.length - 1)] = newValue;
    }


    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){

            console.log("B", this._operation);
        }
    }

    addOperation(value){

        //console.log("A", value, this.getLastOperation());

        if(isNaN(this.getLastOperation())){ //Verify if the last position of _operation array is not a number
            
            if(this.isOperator(value)){ //Verify if value is a operator. If it's, replaces last position
                
                this.setLastOperation(value);
            }
            else if(isNaN(value)){ //Verify if value is not a number
                
                console.log(value);
            }
            else{
                this.pushOperation(value);

            }
        }
        else{ //If value is a number:

            if(this.isOperator(value)){

                this.pushOperation(value);

            }
            else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

            }
        }




        //this._operation.push(value);
        
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
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "igual":

                break;
            case ".":
                this.addOperation(".")
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