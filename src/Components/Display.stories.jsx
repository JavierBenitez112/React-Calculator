import Display from './display.jsx';

export default {
  title: 'Calculator/Display',
  component: Display,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentOperand: {
      control: 'text',
      description: 'The current number being entered or result',
    },
    previousOperand: {
      control: 'text',
      description: 'The previous number in the operation',
    },
    operator: {
      control: { type: 'select' },
      options: ['+', '-', '×', '÷', '%', null],
      description: 'The current operator',
    },
  },
};

export const Empty = {
  args: {
    currentOperand: '0',
    previousOperand: null,
    operator: null,
  },
};

export const WithNumber = {
  args: {
    currentOperand: '123',
    previousOperand: null,
    operator: null,
  },
};

export const WithOperation = {
  args: {
    currentOperand: '456',
    previousOperand: '123',
    operator: '+',
  },
};

export const LongNumber = {
  args: {
    currentOperand: '123456789',
    previousOperand: null,
    operator: null,
  },
};

export const WithDecimal = {
  args: {
    currentOperand: '123.45',
    previousOperand: '67.89',
    operator: '×',
  },
};
