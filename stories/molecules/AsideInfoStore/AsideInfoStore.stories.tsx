import React from "react"
import { AsideInfoStore } from "./index"
import { Text } from "../../atoms"

export default {
  title: "molecules/AsideInfoStore",
  component: AsideInfoStore,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = (args: any) => {
  return (
    <>
      <Text>Hola</Text>
      <AsideInfoStore
        handleClose={() => {
          return
        }}
        show={true}
        active={0}
        children={<></>}
      />
    </>
  )
}

export const TemplateAsideInfoStore = Template.bind({})
