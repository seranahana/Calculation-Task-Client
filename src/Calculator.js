import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calculator() {

    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('+');

    const [simpleOperationResult, setSimpleOperationResult] = useState('');

    function handleOperand1Change(event) {
        setOperand1(event.target.value);
    }

    function handleOperand2Change(event) {
        setOperand2(event.target.value);
    }

    function handleOperatorChange(event) {
        setOperator(event.target.value);
    }

    function handleError(error) {
        console.log(error.response.data);
        let errorMessage = 'Unknown error occurred';
        if (error.response.status === 400 && error.response.data.errors.value.length === 1)
        {
            errorMessage = error.response.data.errors.value[0];
        }
        else
        {
            errorMessage = error.response?.data;
        }
        toast.error(errorMessage);
    }

    async function handleSimpleEvaluation() {
        let endpoint = getEndpoint();
        let params = getParams();
        try
        {
            let response =  await axios.get('https://localhost:5001/v1/calc/' + endpoint, { params });
            setSimpleOperationResult(response.data.toString());
        }
        catch(error)
        {
            handleError(error);
        };
    }

    function getEndpoint() {
        switch (operator) {
            case '+':
                return 'add';
            case '-':
                return 'subtract';
            case '*':
                return 'multiply';
            case '/':
                return 'divide';
            case '√':
                return 'root';
            case '^':
                return 'power';
            default:
                return '';
        }
    }

    function getParams() {
        let params = {};
        switch (operator) {
            case "+":
                params = { value: operand1, addend: operand2 };
                break;
            case "-":
                params = { value: operand1, substrahend: operand2 };
                break;
            case "*":
                params = { value: operand1, multiplier: operand2 };
                break;
            case "/":
                params = { value: operand1, divisor: operand2 };
                break;
            case "√":
                params = { value: operand1, root: operand2 };
                break;
            case "^":
                params = { value: operand1, power: operand2 };
                break;
            default:
                break;
        }
        return params;
    }

    return (
        <div>
            <ToastContainer />
            <label>
                Operand 1:
                <input value={operand1} onChange={handleOperand1Change} />
            </label>

            <select value={operator} onChange={handleOperatorChange}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
                <option value="√">√</option>
                <option value="^">^</option>
            </select>

            <label>
                Operand 2:
                <input value={operand2} onChange={handleOperand2Change} />
            </label>

            <span>=</span>
            <input type="text" readOnly value={simpleOperationResult} />

            <button onClick={handleSimpleEvaluation}>Evaluate</button>
        </div>
    );
}

export default Calculator;