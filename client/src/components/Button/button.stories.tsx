import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta = {
  component: Button,
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "medium",
    type: "primary",
    text: "Primary Button",
    onClick: () => console.log("Hello from Primary Button")
  }
};

export const Small: Story = {
  args: {
    size: "small",
    type: "secondary",
    text: "Secondary Button",
    onClick: () => console.log("Hello from Secondary Button")
  }
};