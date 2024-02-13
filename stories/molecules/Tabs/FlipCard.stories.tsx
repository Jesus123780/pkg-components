import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./index";
import React from "react";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "molecules/Tabs",
  args: {
    children: <div>Front</div>,
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const TabsPrimary: Story = {
  args: {},
};

// <Tabs {...args}>
//     <Tabs.Panel label="Tab 1">
//       <div>Contenido de la pestaña 1</div>
//     </Tabs.Panel>
//     <Tabs.Panel label="Tab 2">
//       <div>Contenido de la pestaña 2</div>
//     </Tabs.Panel>
//   </Tabs>
