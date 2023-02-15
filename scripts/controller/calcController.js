class CalcController{

    constructor(){

        this._lastOperator = "";
        this._lastNumber = "";


        this._operation = [];
        this.locale = "pt-BR"
        this._displayCalcEL = document.querySelector("#display");
        this._dateCalcEL = document.querySelector("#data");
        this._timeCalcEL = document.querySelector("#hora");
        this._currentDate;
        this.inicialize();
        this.initButtonsEvents();
        this.initKeyboard();
        this.pasteFromClipboard();
    }


    pasteFromClipboard(){

        document.addEventListener('paste', e =>{

            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
            console.log(text);
        });

    }

    copyToClipboard(){

        let input = document.createElement("input");
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();
        

    }

    inicialize(){
        
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay();      
        this.pasteFromClipboard();

    }

    initKeyboard(){

        document.addEventListener('keyup', e =>{
            console.log(e.key);
            switch(e.key){
                case "F5":
                    break;
                case "Escape":
                    this.clearAll();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key);
                    break;
                case "Enter":
                case "=":
                    this.calc();
                    break;
                case ".":
                case ",":
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;
                case "c":
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
                case "Control":
                    if(e.key == "c") this.copyToClipboard();
                    break;
                default:
                    break;
                }

        });

    }
    
    addEventListenerAll(element, event, f){
        // Add more than one Event to a button
        event.split(" ").forEach(event => {
            element.addEventListener(event, f, false);
        });
            
    }

    clearAll(){
        //Clear Calculator
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();

    }

    clearEntry(){
        //Clear Last Entry
        this._operation.pop();
        this.setLastNumberToDisplay();

    }

    getLastOperation(){
        //Get last value of array _operation
        return this._operation[this._operation.length - 1];

    }

    isOperator(value){
        //Identify if value is a operator ('+', "-", "*", "%", "/")
        return (['+', "-", "*", "%", "/"].indexOf(value) > -1)

    }


    setLastOperation(newValue){
        //Define a new value for the last _operation position
        this._operation[(this._operation.length - 1)] = newValue;
    }


    pushOperation(value){
        //Insert a value in operation
        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();
        }
    }

    getResult(){
        //Get the final result of _operation
        return eval(this._operation.join(""));// Evaluete _operation array using .join("") to convert in a string without ","
    }

    calc(){
        //Execute the calculator logic process, never leaving array get bigger than 3

        let last = '';
        this._lastOperator = this.getLastItem(true);

        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }


        if(this._operation.length > 3){

            let last = this._operation.pop();
            
            this._lastNumber = this.getResult();
        }
        else if (this._operation.length == 3){

            this._lastNumber = this.getLastItem(false);

        }
        
        let result = this.getResult();

        if (last == '%'){

            result /= 100;
            this._operation = [result];
        }
        else{

            this._operation = [result];
            if (last) this._operation.push(last);

        }
        

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        //Get the last item of _operation array. Can be used to get Operators (true) or Numbers (False)
        let lastItem;
        for(let i = this._operation.length-1; i>=0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
            
        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;


    }


    setLastNumberToDisplay(){
        //Send the last number to display
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;


        this.displayCalc = lastNumber;

    }


    addOperation(value){
        if(isNaN(this.getLastOperation())){ //Verify if the last position of _operation array is not a number
            
            if(this.isOperator(value)){ //Verify if value is a operator. If it's, replaces last position
                
                this.setLastOperation(value);

            }
            
            else{
                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }
        }
        else{ //If value is a number:

            if(this.isOperator(value)){

                this.pushOperation(value);

            }
            else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
                //att display
            }
        }      
    }


    setError(){

        this.displayCalc = "Error";

    }

    addDot(){
        let lastOperation = this.getLastOperation();
        console.log(lastOperation);

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }
        else{
            this.setLastOperation(lastOperation.toString()+'.');
        }
        this.setLastNumberToDisplay();
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
                this.calc();
                break;
            case "ponto":
                this.addDot();
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