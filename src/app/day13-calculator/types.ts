export type Operation = '+' | '-' | '*' | '/' | null;

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForNewValue: boolean;
  formula: string;
}

export type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'decimal'; 