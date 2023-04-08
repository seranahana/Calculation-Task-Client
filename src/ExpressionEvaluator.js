import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExpressionEvaluator() {

    const [expression, setExpression] = useState('');
    const [expressionResult, setExpressionResult] = useState('');

    function handleExpressionChange(event) {
        setExpression(event.target.value);
    }

    function handleError(error) {
        let errorMessage = error.response?.data || 'Unknown error occurred';
        toast.error(errorMessage);
    }

    async function handleExpressionEvaluation() {
        try
        {
            let response =  await axios.get('https://localhost:5001/v1/calc/expression', {
                params: {
                    expression: expression,
                }
            });
            setExpressionResult(response.data.toString());
        }
        catch(error)
        {
            handleError(error);
        };
    }

    return (
        <div>
            <ToastContainer />
            <label>
                Enter string expression:
                <input value={expression} onChange={handleExpressionChange} />
            </label>

            <span>=</span>
            <input type="text" readOnly value={expressionResult} />

            <button onClick={handleExpressionEvaluation}>Evaluate</button>
        </div>
    );
}

export default ExpressionEvaluator;
