  import React from 'react';
  import {action, actions} from "@storybook/addon-actions";
  import "@storybook/addon-console";
  import Toaster from './Toaster';
  // import Center from '../Center';

  // story

  const ToasterComp = {
    title: 'Toaster/sample',/*mandatory and should be unique throughout entire project*/
    component: Toaster,
    argTypes:{
      message:{control:{type:"text"}},
      auto:{control:{type:"boolean"}},
      duration:{control:{type:"number"}},
      data:{
        control:{type:"object"},
        table:{category:"data"}
      }
    }
  }

  export default ToasterComp;

  // args mechanism
  const Template = args => <Toaster {...args} />;

  // export 1 or more stories using this Template

  // create a story using the primary variant of the DivTag
  export const ToasterPrimary = Template.bind({});
  ToasterPrimary.args = {
    message:"you have reached the toast sample.",
    label: "toast"
  }

  ToasterPrimary.storyName = "Toast Sample";
