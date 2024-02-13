import type { Preview as StorybookPreview } from '@storybook/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import '../stories/assets/public/global.css';
import '../stories/assets/public/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface NextRouter {
  Provider: typeof RouterContext.Provider;
}

interface CustomPreview extends StorybookPreview {
  nextRouter: NextRouter;
}

const preview: CustomPreview = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
