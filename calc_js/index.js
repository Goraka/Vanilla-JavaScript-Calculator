document.addEventListener('DOMContentLoaded', ()=>{
    const calcInput = document.getElementById('calc_val');
    const calcDisplay =document.getElementById('calc_x');

    const calcbtnInput = document.getElementsByClassName('calc-button');

    const Operators = {
        MULTIPLY: 'MULTIPLY',
        DIVIDE: 'DIVIDE',
        SUBTRACT: 'SUBTRACT',
        ADD: 'ADD',
        PERC: 'PERC'
    };

    function manageInputSize(){
        const maxSize = '3em';
        const minSize = '1em';

        const inputLength = calcInput.value.length;

        if(inputLength > 10){
            calcInput.style.fontSize = minSize;
        } else if(inputLength < 10) {
            calcInput.style.fontSize = maxSize;
        } else {
            const size = Math.max(10 - inputLength, 2);
            calcInput.style.fontSize = `${size}em`;
        }
    };

    calcInput.addEventListener('keydown', (event) => {
        
        const key = event.key;
        
        if(key === 'Enter'){
            equalOperation();
            return;
        }

        if(key === '+' || key === '-' || key === '*' || key === '/') {
            operations(key);
            event.preventDefault();
            return;
        }

        manageInputSize();
    })

    for(let ctrl=0; ctrl<calcbtnInput.length; ctrl++){
        calcbtnInput[ctrl].addEventListener('click', (event) => {
            let ctrls = event.target.value;

            if(ctrls === 'C'){
                calcInput.value = '';
                calcDisplay.value = '';
                return;
            }
            
            if(ctrls === 'CE'){
                calcInput.value = '';
                return;
            }
            
            if(ctrls === 'DEL'){
                calcInput.value = calcInput.value.slice(0, -1);
                return;
            }

            if(ctrls === 'EQUAL'){
                equalOperation()
                return;
            }

            if(!Object.values(Operators).includes(ctrls)){
                calcInput.value += ctrls;
            }
            else{
                operations(event.target.dataset.op);
                // if(calcInput.value === ''){
                //     calcInput.value = '0';
                // }

                // calcInput.value += event.target.dataset.op;
                // calcDisplay.value = calcInput.value;
                // calcInput.value = '';
            }

            manageInputSize();
        });
    };

    function equalOperation(){
        try {
            let expression = 0;

            if(calcDisplay.value === ''){
                calcDisplay.value = 0;
            }

            expression = calcDisplay.value + calcInput.value;
            console.log(expression);

            calcInput.value = eval(expression);
            calcDisplay.value = '';

        } catch (error) {
            calcDisplay.value = 'Error';
        }
        return;
    };

    function operations(operator){
        if(calcInput.value === ''){
            calcInput.value = '0';
        }

        let expression = calcInput.value + operator;
        calcDisplay.value = expression;
        calcInput.value = '';
        return;
    }

});