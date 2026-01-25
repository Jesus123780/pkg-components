import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview, Preview as StorybookPreview } from '@storybook/react';
import { getRouter } from '@storybook/nextjs/router.mock';
// global styles
import '../stories/assets/public/global.dark.css';
import '../stories/assets/public/global.light.css';
import '../stories/assets/public/styles.css';

// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// calendar
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const preview: StorybookPreview = {
  parameters: {
    nextjs: {
      router: {
        basePath: '/app/',
      },
    },
    async beforeEach() {
      // 👇 Manipulate the default router method mocks
      getRouter().push.mockImplementation(() => {
        /* ... */
      });
    },
    actions: { },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export default preview;
