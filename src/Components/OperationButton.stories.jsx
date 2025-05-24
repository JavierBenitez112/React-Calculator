import { fn } from '@storybook/test';
import { OpButton, OPERATOR_TYPES } from './OperationButton';
import { ACTIONS } from '../logic/Functions';

export default {
  title: 'Calculator/OpButton',
  component: OpButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    operator: {
      control: { type: 'select' },
      options: ['+', '-', '×', '÷', '%', '+/-'],
      description: 'The operator symbol',
    },
    type: {
      control: { type: 'select' },
      options: Object.values(OPERATOR_TYPES),
      description: 'The type of operator button',
    },
    dispatch: {
      description: 'Function to dispatch actions',
    },
  },
};

export const RightOperator = {
  args: {
    operator: '+',
    type: OPERATOR_TYPES.RIGHT,
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};

export const TopOperator = {
  args: {
    operator: '%',
    type: OPERATOR_TYPES.TOP,
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};

export const SignToggle = {
  args: {
    operator: '+/-',
    type: OPERATOR_TYPES.TOP,
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};
