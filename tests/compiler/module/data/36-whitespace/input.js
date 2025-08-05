import { component, html } from "ivi";

const c = component(() => {
  return (v) => html`
    <a>
    \v${v}\v
    </a>
	`;
});
