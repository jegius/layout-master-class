import { html } from "lit-html";
import "./button-component.js";
import { ButtonComponent } from "./button-component.js";
import "./button-component.template.js";
import "./button-component.styles.js";
import "../common.css";

export default {
  title: "ButtonComponent",
  tags: ["autodocs"],
};

const Template = () => {
  return html`
    <button-component></button-component>
  `;
};

export const Default = Template.bind({});