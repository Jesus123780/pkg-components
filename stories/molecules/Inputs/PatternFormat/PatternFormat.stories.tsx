import React from 'react'
import {
  PatternFormat,
  NumericFormat,
  NumberFormatBase
} from './index'

export default {
  title: 'molecules/PatternFormat',
  component: PatternFormat,
  argTypes: {
    format: {
      control: {
        type: 'text'
      }
    },
    patternChar: {
      control: {
        type: 'text'
      }
    },
    value: {
      control: {
        type: 'text'
      }
    },
    allowLeadingZeros: {
      control: {
        type: 'boolean'
      }
    },
    thousandSeparator: {
      control: {
        type: 'text'
      }
    },
    prefix: {
      control: {
        type: 'text'
      }
    },
    suffix: {
      control: {
        type: 'text'
      }
    }
  }
}

const Template: React.FC = () => {
  return <PatternFormat format='%%%' patternChar='%' value={23456} />
}

export const TemplatePatternFormat = Template.bind({})

const TemplateNumeric: React.FC = () => {
  return <NumericFormat value="20020220" allowLeadingZeros thousandSeparator="," prefix={'$'} />
}

export const TemplateNumericFormat = TemplateNumeric.bind({})

// suffix

const TemplateNumericSuffix: React.FC = () => {
  return <NumericFormat value="20020220" allowLeadingZeros thousandSeparator="," suffix={'%'} />
}

export const TemplateNumericFormatSuffix = TemplateNumericSuffix.bind({})

// MyCustomNumberFormat

const format = (numStr: string): number | bigint | string => {
  if (numStr === '') return ''

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'symbol', // Puedes cambiar esto a 'code' o 'name' según prefieras
    maximumFractionDigits: 0
  }).format(Number(numStr))
}

const TemplateMyCustomNumberFormat: React.FC = () => {
  return <NumberFormatBase value="20020220" placeholder='$' format={format} />
}

export const TemplateCustomNumberFormat = TemplateMyCustomNumberFormat.bind({})

// mask
const TemplateMask: React.FC = () => {
  return <PatternFormat format="+57 (###) #### ###" allowEmptyFormatting mask="_" />
}

export const TemplateMaskFormat = TemplateMask.bind({})

const TemplateCreditCard: React.FC = () => {
  return <PatternFormat value="" valueIsNumericString format="#### #### #### ####" mask="_" />
}

export const TemplateCreditCardFormat = TemplateCreditCard.bind({})
