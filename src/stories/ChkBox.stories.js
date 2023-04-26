import { ChkBox } from './ChkBox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'ChkBox',
  component: ChkBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Large = {
  args: {
    size: 'large',
    label: 'label',
  },
};
export const Medium = {
  args: {
    size: 'medium',
    label: 'label',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'label',
  },
};
