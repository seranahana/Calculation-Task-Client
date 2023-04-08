import React from 'react';
import Calculator from './Calculator';
import ExpressionEvaluator from './ExpressionEvaluator';

function App() {
  return (
    <div>
      <h1>Simple operations:</h1>
      <Calculator />
      <h1>String expression:</h1>
      <ExpressionEvaluator />
    </div>
  );
}

export default App;
