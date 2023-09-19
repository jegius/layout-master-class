import template from "./button-component.template.js";

export class ButtonComponent extends HTMLElement {
  static get name() {
    return "button-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = template;
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
