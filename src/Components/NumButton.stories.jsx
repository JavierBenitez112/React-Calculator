import { fn } from '@storybook/test';
import NumButton from './NumButton';
import { ACTIONS } from '../logic/Functions';

export default {
  title: 'Calculator/NumButton',
  component: NumButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: { type: 'text' },
      description: 'The number or symbol to display on the button',
    },
    dispatch: {
      description: 'Function to dispatch actions',
    },
  },
};

export const Number = {
  args: {
    number: '7',
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};

export const Decimal = {
  args: {
    number: '.',
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};

export const Zero = {
  args: {
    number: '0',
    dispatch: fn((action) => {
      console.log('Button clicked:', action);
    }),
  },
};
