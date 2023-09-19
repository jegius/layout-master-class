/** @type { import('@storybook/web-components').Preview } */
import {ButtonComponent} from '../components/button/button-component';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


[
  ButtonComponent,
].map((component) => customElements.define(component.name, component));
export default preview;
