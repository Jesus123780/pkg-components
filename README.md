# 📦 pkg-components

Librería de componentes UI basada en React, enfocada en la construcción de interfaces reutilizables, escalables y consistentes dentro de aplicaciones modernas.

---

## 🚀 Descripción

`pkg-components` es un design system construido con **React 19**, **Storybook** y herramientas modernas del ecosistema frontend. Su propósito es centralizar componentes reutilizables, estilos y lógica UI para acelerar el desarrollo de aplicaciones.

---

## Descripción general

Este paquete centraliza:

- Componentes UI reutilizables.
- Estructuras por nivel de complejidad: **atoms**, **molecules**, **organisms**, **templates**, **pages** y **skeletons**.
- Utilidades, hooks y assets compartidos.
- Estilos globales y dependencias visuales base.
- Exportación de herramientas de desarrollo como `framer-motion`, `@dnd-kit/core` y `react-beautiful-dnd`.

El objetivo es que cualquier proyecto consumidor pueda importar componentes y utilidades desde un único punto de entrada: `index.tsx`.

---


Incluye soporte para:

- Componentes reutilizables
- Visualización y documentación con Storybook
- Testing con Jest y Testing Library
- Manejo de estilos con styled-components
- Animaciones con Framer Motion
- Integración con mapas, gráficos y utilidades varias

---

## 🧰 Tecnologías principales

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

## 📦 Instalación

```bash
npm install pkg-components
```

---

## Scripts disponibles

| Script | Descripción |
|--------|------------|
| `npm run sb` | Levanta Storybook en modo desarrollo |
| `npm run build` | Construye Storybook para producción |
| `npm run build-storybook` | Alias de build Storybook |
| `npm run build:components` | Compila stories/compontes con Babel hacia `dist` |
| `npm run build:tokens` | Genera tokens desde `scripts/build-tokens.js` |
| `npm run lint` | Ejecuta ESLint en todo el proyecto |
| `npm run lint:fix` | Corrige automáticamente problemas de lint |
| `npm run check:types` | Valida tipos con TypeScript |
| `npm run check:te` | Ejecuta types + eslint |
| `npm run test` | Ejecuta test unitarios con Jest |
| `npm run test:generate-output` | Genera salida JSON de Jest |
| `npm run chromatic` | Publica el build para Chromatic |
| `npm run semantic-release` | Genera releases automáticos |
| `npm run update:version` | Incrementa versión y prepara commit |

---

## 📚 Uso básico

```tsx
import { Button } from 'pkg-components'

export default function Example() {
  return  <Button primary onClick={handleRedirect}>
          Volver a la página anterior
        </Button>
}
```

---

## 🧩 Estructura del proyecto


```bash
pkg-components/
├── .storybook/              # Configuración de Storybook
├── .vscode/                 # Ajustes del editor
├── assets/                  # Assets globales del paquete
├── helpers/                 # Funciones auxiliares
├── hooks/                   # Custom hooks reutilizables
├── public/                  # Archivos públicos estáticos
├── scripts/                 # Scripts de automatización y tokens
├── stories/                 # Componentes documentados para Storybook
│   ├── assets/
│   ├── atoms/
│   ├── Layout/
│   ├── molecules/
│   ├── organisms/
│   ├── pages/
│   ├── skeletons/
│   └── templates/
├── storybook-static/        # Build estático de Storybook
├── types/                   # Tipos compartidos
├── utils/                   # Utilidades generales
├── index.tsx                # Punto de entrada principal del paquete
├── package.json
└── README.md
```

## Punto de entrada: `index.tsx`

El archivo `index.tsx` funciona como el **entry point** del paquete. Desde allí se importan estilos, dependencias base y se reexportan componentes, hooks, utilidades y herramientas de desarrollo.

### Estilos globales cargados

El paquete importa automáticamente:

- `./stories/assets/public/styles.css`
- `./stories/assets/public/global.light.css`
- `./stories/assets/public/global.dark.css`
- estilos de `swiper`
- estilos de `react-date-range`
- estilos de `react-grid-layout`
- estilos de `react-resizable`

---


## Arquitectura por capas

La librería sigue una estructura inspirada en Atomic Design:

### Atoms
Componentes básicos e independientes, como botones, inputs, iconos, badges o labels.

### Molecules
Combinaciones simples de atoms para formar bloques funcionales.

### Organisms
Secciones más completas de interfaz, como headers, cards compuestas o formularios más robustos.

### Templates
Plantillas de estructura general para páginas o vistas.

### Pages
Componentes orientados a representar páginas completas o pantallas.

### Skeletons
Estados de carga y placeholders para mejorar la experiencia de usuario durante la espera de datos.

### Layout
Componentes enfocados en estructura, distribución y contenedores visuales.


## 🎨 Diseño y componentes

El proyecto sigue principios de **Design System**, promoviendo:

- Reutilización
- Consistencia visual
- Separación de lógica y presentación
- Escalabilidad

Incluye componentes como:

- Inputs y formularios
- Gráficos (Chart.js, Recharts)
- Mapas (Google Maps API)
- QR y códigos de barras
- Layouts dinámicos (Grid Layout, DnD)

---

## 🧪 Testing

Se utilizan:

- Jest
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`


Ejemplo:

```bash
npm run test
```

---

## 📖 Storybook

Storybook permite visualizar y documentar los componentes de forma aislada.

```bash
npm run sb
```

Luego abre:

```
http://localhost:6006
```

---


##  🚀  Publicación y versionado

El paquete usa **versionado semántico** y está preparado para automatizar releases mediante `semantic-release`.

Ejemplo:

- `2.3.20`

La versión actual también se exporta desde el paquete:

```tsx
import { version } from 'pkg-components'
```

El proyecto utiliza **semantic-release** para versionado automático basado en commits.

Convención recomendada:

```bash
feat: agregar nuevo componente
fix: corregir comportamiento de botón
refactor: limpieza de código
```

---

## Configuración relacionada

El repositorio también incluye archivos para soporte de desarrollo y automatización:

- `.storybook/` para configuración de Storybook
- `chromatic.config.json` para visual testing
- `commitlint.config.js` para validación de commits
- `jest.config.ts` para pruebas
- `createStoryFile.js` para generación de stories
- `increment-version.js` para control de versión
- `styles.css`, `swiper.min.css` y archivos de estilos base

---

## 🛠️ Desarrollo

1. Clonar repositorio

```bash
git clone https://github.com/Jesus123780/pkg-components.git
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar Storybook

```bash
npm run sb
```

---

## 📌 Buenas prácticas

- Mantener componentes desacoplados
- Documentar cada componente en Storybook
- Escribir tests para lógica crítica
- Usar TypeScript estrictamente

---

## 🤝 Contribuciones

1. Crear rama desde `main`
2. Realizar cambios
3. Crear Pull Request
4. Seguir convención de commits

---

## 📄 Licencia

ISC

---

## 👨‍💻 Autor

Jesús Juvinao

---

## 💡 Notas

Este paquete está diseñado para ser utilizado como base de un sistema de diseño empresarial, facilitando la construcción de interfaces consistentes y mantenibles.