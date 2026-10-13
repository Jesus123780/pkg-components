import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './index'

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'atoms/Text',
  parameters: {
    docs: {
      description: {
        component: [
          'El componente **Text** presenta contenido textual usando los tokens de tipografía de la librería.',
          '',
          '- Usa `size`, `color`, `font`, `weight`, `align` y `lineHeight` para aplicar los estilos del sistema de diseño.',
          '- Usa `as` para seleccionar un elemento semántico como `p`, `h1` o `label`.',
          '- Usa `customSize` y `customColor` para valores CSS personalizados.',
          '- Usa `lineClamp`, `truncate` o `noWrap` para controlar el desbordamiento del texto.',
          '- Las propiedades `style` y `styles` se conservan para personalización en línea y compatibilidad.'
        ].join('\n')
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenido que se mostrará dentro del componente.'
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'label', 'strong', 'em', 'h1', 'h2', 'h3'],
      description: 'Elemento HTML que se renderiza.'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'green', 'gray-dark', 'gray', 'blue', 'white', 'black'],
      description: 'Token de color del sistema de diseño.'
    },
    customColor: {
      control: 'color',
      description: 'Color CSS personalizado que tiene prioridad sobre color.'
    },
    size: {
      control: 'select',
      options: ['', '2xs', 'xs', 'sm', 'md', 'md2', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '9xl', '10xl', 'xxl'],
      description: 'Token de tamaño tipográfico.'
    },
    customSize: {
      control: 'text',
      description: 'Tamaño CSS personalizado, por ejemplo 18px o 1.125rem.'
    },
    font: {
      control: 'select',
      options: ['', 'regular', 'medium', 'semibold', 'bold', 'light'],
      description: 'Familia tipográfica.'
    },
    weight: {
      control: 'select',
      options: ['hairline', 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', 100, 200, 300, 400, 500, 600, 700, 800, 900],
      description: 'Peso de la fuente mediante token o valor numérico.'
    },
    align: {
      control: 'select',
      options: ['start', 'left', 'center', 'right', 'end', 'justify'],
      description: 'Alineación horizontal del texto.'
    },
    lineHeight: {
      control: 'select',
      options: ['', 'none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '9xl', '10xl', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'Token de altura de línea o valor CSS.'
    },
    lineClamp: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número máximo de líneas visibles.'
    },
    truncate: {
      control: 'boolean',
      description: 'Trunca a una línea con puntos suspensivos.'
    },
    noWrap: {
      control: 'boolean',
      description: 'Evita que el texto salte a una nueva línea.'
    },
    italic: {
      control: 'boolean',
      description: 'Aplica estilo cursiva.'
    },
    underline: {
      control: 'boolean',
      description: 'Subraya el texto.'
    },
    textTransform: {
      control: 'select',
      options: [undefined, 'none', 'capitalize', 'uppercase', 'lowercase', 'full-width', 'full-size-kana'],
      description: 'Transformación visual del texto.'
    },
    breakWord: {
      control: 'boolean',
      description: 'Permite partir palabras largas para evitar desbordamientos.'
    },
    className: {
      control: false,
      description: 'Una clase CSS o un arreglo de clases CSS.'
    },
    style: {
      control: 'object',
      description: 'Estilos CSS en línea estándar de React.'
    },
    styles: {
      control: 'object',
      description: 'Propiedad heredada para estilos personalizados; se mantiene por compatibilidad.'
    },
    title: {
      control: 'text',
      description: 'Texto del atributo HTML title.'
    }
  },
  args: {
    children: 'Hello, Storybook!',
    as: 'span',
    color: 'blue',
    size: 'md',
    font: 'regular',
    weight: 400,
    align: 'start',
    lineHeight: 'md',
    lineClamp: undefined,
    truncate: false,
    noWrap: false,
    italic: false,
    underline: false,
    breakWord: false
  }
}

export default meta

type Story = StoryObj<typeof Text>

export const Basic: Story = {
  args: {
    children: 'Hello, Storybook!',
    color: 'blue',
    customSize: '20px',
    weight: 600
  }
}

export const Default: Story = {
  args: {
    children: 'Hola',
    color: 'default',
    size: 'sm',
    customSize: undefined,
    weight: 400
  }
}

export const CustomClass: Story = {
  args: {
    children: 'Text with custom class',
    className: 'custom-class'
  }
}

export const MultipleClasses: Story = {
  args: {
    children: 'Text with multiple classes',
    className: ['class1', 'class2', 'class3']
  }
}

export const CustomStyle: Story = {
  args: {
    children: 'Text with custom inline styles',
    color: 'default',
    weight: 'normal',
    style: {
      display: 'inline-block',
      padding: '8px 12px',
      borderRadius: '6px',
      backgroundColor: '#f3f4f6'
    }
  }
}

export const Heading: Story = {
  args: {
    children: 'Título de ejemplo',
    as: 'h1',
    color: 'primary',
    size: '3xl',
    font: 'bold',
    weight: 700,
    lineHeight: 'tight'
  }
}

export const Paragraph: Story = {
  args: {
    children: 'Este es un párrafo de ejemplo que utiliza los tokens tipográficos del sistema de diseño para mantener una presentación coherente.',
    as: 'p',
    color: 'gray-dark',
    size: 'md',
    lineHeight: 'relaxed'
  }
}

export const Truncated: Story = {
  args: {
    children: 'Este texto es muy largo y se mostrará en una sola línea con puntos suspensivos cuando no haya suficiente espacio disponible.',
    truncate: true
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ maxWidth: '280px' }}>
        <StoryComponent />
      </div>
    )
  ]
}

export const LineClamped: Story = {
  args: {
    children: 'Este texto permite comprobar el recorte después de un número específico de líneas. Es útil en tarjetas, listados y vistas compactas donde se necesita limitar la altura del contenido.',
    as: 'p',
    lineClamp: 2
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ maxWidth: '300px' }}>
        <StoryComponent />
      </div>
    )
  ]
}

export const CustomColorAndSize: Story = {
  args: {
    children: 'Texto con tamaño y color personalizados',
    customSize: '1.25rem',
    customColor: '#7c3aed',
    font: 'semibold',
    weight: 600
  }
}

export const NoWrap: Story = {
  args: {
    children: 'Este texto no permite saltos de línea.',
    noWrap: true
  }
}
