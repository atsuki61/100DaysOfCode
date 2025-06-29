'use client';

import { useState, useCallback } from 'react';
import { CalculatorState, Operation } from '../types';
import Display from './Display';
import Button from './Button';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
  formula: '',
};

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const handleNumber = useCallback((num: string) => {
    setState(prevState => {
      if (prevState.waitingForNewValue) {
        const newFormula = prevState.formula ? `${prevState.formula} ${num}` : num;
        return {
          ...prevState,
          display: num,
          waitingForNewValue: false,
          formula: newFormula,
        };
      }
      const newDisplay = prevState.display === '0' ? num : prevState.display + num;
      const baseFormula = prevState.formula.replace(/\d+\.?\d*$/, '');
      const newFormula = baseFormula + newDisplay;
      return {
        ...prevState,
        display: newDisplay,
        formula: newFormula,
      };
    });
  }, []);

  const handleOperator = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    setState(prevState => {
      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operation: nextOperation as Operation,
          waitingForNewValue: true,
          formula: `${prevState.display} ${nextOperation}`,
        };
      }

      if (prevState.operation && !prevState.waitingForNewValue) {
        const currentValue = prevState.previousValue || 0;
        const result = calculate(currentValue, inputValue, prevState.operation);

        return {
          ...prevState,
          display: String(result),
          previousValue: result,
          operation: nextOperation as Operation,
          waitingForNewValue: true,
          formula: `${prevState.formula} = ${result} ${nextOperation}`,
        };
      }

      const formulaWithoutLastOp = prevState.formula.replace(/\s[+\-*/]\s?$/, '');
      return {
        ...prevState,
        operation: nextOperation as Operation,
        waitingForNewValue: true,
        formula: `${formulaWithoutLastOp} ${nextOperation}`,
      };
    });
  }, [state.display]);

  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(state.display);

    setState(prevState => {
      if (prevState.previousValue !== null && prevState.operation) {
        const result = calculate(prevState.previousValue, inputValue, prevState.operation);
        return {
          ...prevState,
          display: String(result),
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
          formula: `${prevState.formula} = ${result}`,
        };
      }
      return prevState;
    });
  }, [state.display]);

  const handleClear = useCallback(() => {
    setState(initialState);
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prevState => {
      if (prevState.waitingForNewValue) {
        const newFormula = prevState.formula ? `${prevState.formula} 0.` : '0.';
        return {
          ...prevState,
          display: '0.',
          waitingForNewValue: false,
          formula: newFormula,
        };
      }
      if (prevState.display.indexOf('.') === -1) {
        const newDisplay = prevState.display + '.';
        const baseFormula = prevState.formula.replace(/\d+\.?\d*$/, '');
        const newFormula = baseFormula + newDisplay;
        return {
          ...prevState,
          display: newDisplay,
          formula: newFormula,
        };
      }
      return prevState;
    });
  }, []);

  const calculate = useCallback((firstValue: number, secondValue: number, operation: Operation): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : firstValue;
      default:
        return secondValue;
    }
  }, []);

  const handleButtonClick = useCallback((value: string) => {
    if (/\d/.test(value)) {
      handleNumber(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
    } else if (value === '=') {
      handleEquals();
    } else if (value === 'C') {
      handleClear();
    } else if (value === '.') {
      handleDecimal();
    }
  }, [handleNumber, handleOperator, handleEquals, handleClear, handleDecimal]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full mx-auto">
      <Display value={state.display} formula={state.formula} />
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Row 1 */}
        <Button value="C" type="clear" onClick={handleButtonClick} className="col-span-2" />
        <Button value="/" type="operator" onClick={handleButtonClick} />
        <Button value="*" type="operator" onClick={handleButtonClick} />

        {/* Row 2 */}
        <Button value="7" type="number" onClick={handleButtonClick} />
        <Button value="8" type="number" onClick={handleButtonClick} />
        <Button value="9" type="number" onClick={handleButtonClick} />
        <Button value="-" type="operator" onClick={handleButtonClick} />

        {/* Row 3 */}
        <Button value="4" type="number" onClick={handleButtonClick} />
        <Button value="5" type="number" onClick={handleButtonClick} />
        <Button value="6" type="number" onClick={handleButtonClick} />
        <Button value="+" type="operator" onClick={handleButtonClick} />

        {/* Row 4 */}
        <Button value="1" type="number" onClick={handleButtonClick} />
        <Button value="2" type="number" onClick={handleButtonClick} />
        <Button value="3" type="number" onClick={handleButtonClick} />
        <Button value="=" type="equals" onClick={handleButtonClick} className="row-span-2" />

        {/* Row 5 */}
        <Button value="0" type="number" onClick={handleButtonClick} className="col-span-2" />
        <Button value="." type="decimal" onClick={handleButtonClick} />
      </div>
    </div>
  );
} 