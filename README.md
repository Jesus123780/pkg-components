# 📦 pkg-components

A React-based UI component library focused on building reusable, scalable, and consistent interfaces within modern applications.

---

## 🚀 Description

`pkg-components` is a design system built with **React 19**, **Storybook**, and modern frontend ecosystem tools. Its purpose is to centralize reusable components, styles, and UI logic to accelerate application development.

---

## Overview

This package centralizes:

- Reusable UI components.

- Structures by level of complexity: **atoms**, **molecules**, **organisms**, **templates**, **pages**, and **skeletons**.

- Shared utilities, hooks, and assets.

- Global styles and basic visual dependencies.

- Exporting development tools such as `framer-motion`, `@dnd-kit/core`, and `react-beautiful-dnd`.

The goal is for any consumer project to be able to import components and utilities from a single entry point: `index.tsx`.

---

Includes support for:

- Reusable components
- Visualization and documentation with Storybook
- Testing with Jest and Testing Library
- Style management with styled-components
- Animations with Framer Motion
- Integration with maps, charts, and various utilities

---

## 🧰 Main Technologies

- React 19
- Next.js 15
- Storybook 8
- TypeScript 5
- Vite
- Styled Components
- Jest + Testing Library
- Framer Motion
- @dnd-kit/core
- react-beautiful-dnd
- react-grid-layout
- react-date-range
- swiper
- qrcode / qrcode.react
- quagga / next-barcode
- recharts / chart.js
- @react-google-maps/api
- @react-pdf/renderer

---

## 📦 Installation

```bash
npm install pkg-components
```

---

## Available Scripts

| Script | Description |

|--------|------------|

`npm run sb` | Starts Storybook in development mode |

`npm run build` | Builds Storybook for production |

`npm run build-storybook` | Alias ​​for build Storybook |

`npm run build:components` | Compiles stories/components with Babel to `dist` |

`npm run build:tokens` | Generates tokens from `scripts/build-tokens.js` |

`npm run lint` | Runs ESLint on the entire project |

`npm run lint:fix` | Automatically fixes lint problems |

`npm run check:types` | Validates types with TypeScript |

`npm run check:te` | Runs types + eslint |

`npm run test` | Runs unit tests with Jest |

`npm run test:generate-output` | Generates JSON output from Jest |

`npm run chromatic` | Publishes the build for Chromatic |

`npm run semantic-release` | Generates automatic releases |

`npm run update:version` | Increments the version and prepares a commit |

`npm run update:version` | Increments the version and prepares a commit` ---

## 📚 Basic Usage

```tsx
import { Button } from 'pkg-components'

export default function Example() {

return <Button primary onClick={handleRedirect}>

Return to the previous page

</Button>

}
```

---

## 🧩 Project Structure

```bash
pkg-components/
├── .storybook/ # Storybook Configuration
├── .vscode/ # Editor Settings
├── assets/ # Global Assets in the Package
├── helpers/ # Helper Functions
├── hooks/ # Reusable Custom Hooks
├── public/ # Static Public Files
├── scripts/ # Scripts Automation and tokens
├── stories/ # Documented components for Storybook
│ ├── assets/
│ ├── atoms/
│ ├── Layout/
│ ├── molecules/
│ ├── organisms/
│ ├── pages/
│ ├── skeletons/
│ └── templates/
├── storybook-static/ # Static Storybook build
├── types/ # Shared types
├── utils/ # General utilities
├── index.tsx # Main entry point of the Package
├── package.json
└── README.md
```

## Entry Point: `index.tsx`

The `index.tsx` file serves as the package's **entry point**. Styles and base dependencies are imported from here, and components, hooks, utilities, and development tools are re-exported.


### Loaded Global Styles

The package automatically imports:

- `./stories/assets/public/styles.css`
- `./stories/assets/public/global.light.css`
- `./stories/assets/public/global.dark.css`
- `swiper` styles
- `react-date-range` styles
- `react-grid-layout` styles
- `react-resizable` styles

---

## Layered Architecture

The library follows a structure inspired by Atomic Design:

### Atoms
Basic, independent components, such as buttons, inputs, icons, badges, and labels.

### Molecules
Simple combinations of atoms to form functional blocks.

### Organisms
More complete interface sections, such as headers, composite cards, and more robust forms.

### Templates
General structure templates for pages or views.

### Pages
Components designed to represent complete pages or screens.

### Skeletons
Loading states and placeholders to improve the user experience while waiting for data.

### Layout
Components