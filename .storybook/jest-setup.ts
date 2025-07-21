// .storybook/jest-setup.ts

import 'jest-canvas-mock'; // Soporte para APIs del canvas (ej. Chart.js)
import 'jest-extended';    // Matchers extra como toBeEmpty, toIncludeAllMembers, etc.
import '@testing-library/jest-dom'; // Matchers de Testing Library (ej. toBeInTheDocument)
