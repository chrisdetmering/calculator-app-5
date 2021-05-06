const windowDOM = document.getElementById('window');
let currentValue = "0";
let previousValue = "0";
let currentOperator = "none";
windowDOM.innerHTML = currentValue;

function solveIt(operator){

    if (operator === "divide"){
        currentValue = parseInt(previousValue) / parseInt(currentValue);
    }
    if (operator === "multiply"){
        currentValue = parseInt(previousValue) * parseInt(currentValue)
    }
    if (operator === "subtract"){
        currentValue = parseInt(previousValue) - parseInt(currentValue)
    }
    if (operator === "add"){
        currentValue = parseInt(previousValue) + parseInt(currentValue)
    }

    currentValue = Math.round(currentValue * 1000) / 1000
    currentOperator="none"
}


window.addEventListener('click', function(event){

    if(event.target.matches('#clear')){
        currentValue = "0";
        previousValue  = "0";
        currentOperator = "none";
    }

    if(event.target.matches('.number')){
        //Display at least 10 digits on the screen
        if(currentOperator == "none" && previousValue== "0"){
            if(currentValue.length < 10){
                if(currentValue === "0"){
                    currentValue = event.target.value;
                } else{
                    currentValue = currentValue.concat(event.target.value);
                }
            }
        }
        // if(currentOperator !== "none" && previousValue === "0"){
        //     previousValue = currentValue;
        //     currentValue = event.target.value;
        // }
        // if(currentOperator !== "none" && previousValue !== "0"){
        //     if(currentValue.length < 10){
        //         if(currentValue === "0"){
        //             currentValue = event.target.value;
        //         } else{
        //             currentValue = currentValue.concat(event.target.value);
        //         }
        //     }
        // }

        if(currentOperator !=="none"){
            previousValue = currentValue;
            currentValue = event.target.value;
        }
    }

    if(event.target.matches('#decimal')){
        //display decimals to at least the thousandth(0.001)
        //STILL NEED THE RESULT TO APPEAR AS SUCH
        if(!currentValue.includes(".")){
            currentValue = currentValue.concat(event.target.value)
        }
    }

    if(event.target.matches('.operator')){
        //IF FIRST TIME USING OPERATOR
        if(currentOperator === "none"){
            previousValue = currentValue;
            currentOperator = event.target.value
            return event.preventDefault()
        }
        //IF NOT FIRST TIME USING OPERATOR
        if(currentOperator !== "none"){
            solveIt(currentOperator)
            previousValue = "0";
            currentOperator = event.target.value;
        }

    }

    if(event.target.matches('#equals')){
        
        solveIt(currentOperator);
    }

    event.preventDefault()
    windowDOM.innerHTML = currentValue;

})



