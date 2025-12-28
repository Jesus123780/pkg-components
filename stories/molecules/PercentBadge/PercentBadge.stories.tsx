import type { Meta, StoryObj } from '@storybook/react'
import { PercentBadge, type PercentBadgeProps } from './index'

const meta: Meta<typeof PercentBadge> = {
  component: PercentBadge,
  title: 'molecules/PercentBadge',
  parameters: {
    docs: {
      description: {
        component: `
**PercentBadge**

Small, accessible badge that displays the percent change between two values or a precomputed percent.

- Uses integer-safe arithmetic under the hood to avoid floating point rounding errors.
- Accepts either \`baseValue\` + \`compareValue\` (recommended) *or* a \`percentOverride\`.
- Fully customizable via \`precision\`, \`size\`, \`showSign\` and \`showArrow\`.
- Provides \`onError\` callback for handling invalid inputs (for example division by zero).

**Usage**

\`\`\`tsx
import { PercentBadge } from 'components/molecules/PercentBadge'

<PercentBadge baseValue={125} compareValue={90} precision={0} />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    baseValue: {
      description: 'Original/base value (e.g. previous price). Required if percentOverride is not provided.',
      control: { type: 'number' }
    },
    compareValue: {
      description: 'New/compare value (e.g. current price). Required if percentOverride is not provided.',
      control: { type: 'number' }
    },
    percentOverride: {
      description: 'If provided, component will use this percent instead of calculating it (string or number).',
      control: { type: 'text' }
    },
    precision: {
      description: 'Number of decimals to show in the percentage (default 0).',
      control: { type: 'number', min: 0, max: 6, step: 1 },
      defaultValue: 0
    },
    showSign: {
      description: 'Whether to show the + sign for positive values (default true).',
      control: { type: 'boolean' },
      defaultValue: true
    },
    showArrow: {
      description: 'Whether to show the up/down arrow glyph (default true).',
      control: { type: 'boolean' },
      defaultValue: true
    },
    size: {
      description: 'Visual size: "small" | "medium" | "large".',
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium'
    },
    className: {
      table: { disable: true }
    },
    positiveClass: {
      description: 'Optional className to override positive style.',
      control: { type: 'text' }
    },
    negativeClass: {
      description: 'Optional className to override negative style.',
      control: { type: 'text' }
    },
    neutralClass: {
      description: 'Optional className to override neutral style.',
      control: { type: 'text' }
    },
    onError: {
      description: 'Callback called when calculation fails (e.g. division by zero).',
      action: 'onError'
    }
  }
}

export default meta
type Story = StoryObj<typeof PercentBadge>

/**
 * Primary
 * - Example: base 125 -> compare 90 = -28%
 */
export const Primary: Story = {
  args: {
    baseValue: 125,
    compareValue: 90,
    precision: 0,
    showSign: true,
    showArrow: true,
    size: 'medium'
  },
  parameters: {
    docs: {
      storyDescription: 'Default usage: computes percent change between two numeric values. 125 -> 90 yields **-28%** (rounded to 0 decimals).'
    }
  }
}

/**
 * StepTwo
 * - Example: base 100 -> compare 110 = +10%
 */
export const StepTwo: Story = {
  args: {
    baseValue: 100,
    compareValue: 110,
    precision: 0,
    showSign: true,
    showArrow: true,
    size: 'medium'
  },
  parameters: {
    docs: {
      storyDescription: 'Positive change example: 100 -> 110 yields **+10%**.'
    }
  }
}

/**
 * StepEnd
 * - Example: direct percent override with decimals
 */
export const StepEnd: Story = {
  args: {
    percentOverride: '-12.34',
    precision: 2,
    showSign: true,
    showArrow: false,
    size: 'small'
  },
  parameters: {
    docs: {
      storyDescription: 'Percent override example: pass a precomputed percent string/number. Useful when the percent is calculated server-side.'
    }
  }
}
