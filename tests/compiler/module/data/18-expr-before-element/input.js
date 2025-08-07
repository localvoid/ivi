import { component, html } from "ivi";

const c = component(() => {
  return (v) => html`
    <a class=${v.a}>
      ${v.b}
      <b/>
    </a>
  `;
});
